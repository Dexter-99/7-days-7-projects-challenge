package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/calendar/v3"
	"google.golang.org/api/option"
)

type credential struct {
	Cid          string   `json:"client_id"`
	Csecret      string   `json:"client_secret"`
	Origins      []string `json:"javascript_origins"`
	Redirect     []string `json:"redirect_uris"`
	AuthProvider string   `json:"auth_provider_x509_cert_url"`
	ProjectId    string   `json:"project_id"`
	Auth_URI     string   `json:"auth_uri"`
	Token_URI    string   `json:"token_uri"`
}

var (
	cred              credential
	googleOauthConfig *oauth2.Config
	randomState       = "random"
)

func init() {

	f, err := ioutil.ReadFile("creds.json")
	if err != nil {
		fmt.Println("could not read the file:", err)
	}
	err = json.Unmarshal(f, &cred)
	// fmt.Print(cred.Redirect[0])
	googleOauthConfig = &oauth2.Config{

		RedirectURL:  cred.Redirect[0],
		ClientID:     cred.Cid,
		ClientSecret: cred.Csecret,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/calendar",
			"https://www.googleapis.com/auth/calendar.events",
			"https://www.googleapis.com/auth/calendar.events.readonly",
		},
		Endpoint: google.Endpoint,
	}
}

func GoogleSignupHandler(w http.ResponseWriter, r *http.Request) {
	url := googleOauthConfig.AuthCodeURL(randomState)
	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}

// Saves a token to a file path.
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		fmt.Println(err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

//GoogleCallbackHandler func
func GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Print("callback recieved")
	// var res utility.Result

	if r.FormValue("state") != randomState {
		w.Write([]byte(`state invalid`))
		return
	}
	ctx := context.Background()
	token, err := googleOauthConfig.Exchange(oauth2.NoContext, r.FormValue("code"))
	if err != nil {
		w.Write([]byte(`token invalid`))
		return
	}
	saveToken("token.json", token)
	client := googleOauthConfig.Client(context.Background(), token)
	srv, err := calendar.NewService(ctx, option.WithHTTPClient(client))
	if err != nil {
		log.Fatalf("Unable to retrieve Calendar client: %v", err)
	}

	t := time.Now().Format(time.RFC3339)
	events, err := srv.Events.List("primary").ShowDeleted(false).
		SingleEvents(true).TimeMin(t).MaxResults(10).OrderBy("startTime").Do()
	if err != nil {
		log.Fatalf("Unable to retrieve next ten of the user's events: %v", err)
	}
	fmt.Println("Upcoming events:")
	if len(events.Items) == 0 {
		fmt.Println("No upcoming events found.")
	} else {
		for _, item := range events.Items {
			date := item.Start.DateTime
			if date == "" {
				date = item.Start.Date
			}
			fmt.Printf("%v (%v)\n", item.Summary, date)
		}
	}
	// resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	// if err != nil {
	// 	w.Write([]byte(`state response`))
	// 	return
	// }

	// defer resp.Body.Close()

	// var user struct {
	// 	ID      string `json:"id"`
	// 	Email   string `json:"email"`
	// 	Name    string `json:"name"`
	// 	Fname   string `json:"given_name"`
	// 	Sname   string `json:"family_name"`
	// 	Picture string `json:"picture"`
	// }

	// err = json.NewDecoder(resp.Body).Decode(&user)
	// if err != nil {
	// 	w.Write([]byte(`decoding invalid`))
	// 	return
	// }
	// var output struct {
	// 	Name  string
	// 	Email string
	// }
	// output.Name = user.Name
	// output.Email = user.Email
	// b, _ := json.Marshal(output)
	// w.Write(b)
	// w.WriteHeader(http.StatusAccepted)
	return
}
