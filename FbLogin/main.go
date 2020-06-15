package main

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	// "github.com/gin-gonic/gin"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/facebook"
	fb "github.com/huandu/facebook"
)

// Credentials which stores google ids.
type Credentials struct {
	Cid     string `json:"cid"`
	Csecret string `json:"csecret"`
}

// User is a retrieved and authentiacted user.
type User struct {
}

var cred Credentials
var conf *oauth2.Config
var state string
var store = sessions.NewCookieStore([]byte("somanyfiles"))
var session *sessions.Session

func randToken() string {
	b := make([]byte, 32)
	rand.Read(b)
	return base64.StdEncoding.EncodeToString(b)
}

func init() {
	file, err := ioutil.ReadFile("./creds.json")
	if err != nil {
		log.Printf("File error: %v\n", err)
		os.Exit(1)
	}
	json.Unmarshal(file, &cred)

	conf = &oauth2.Config{
		ClientID:     cred.Cid,
		ClientSecret: cred.Csecret,
		RedirectURL:  "http://localhost:8000/auth",
		Scopes:       []string{"email"},
		Endpoint:     facebook.Endpoint,
	}
}

func getLoginURL(state string) string {
	return conf.AuthCodeURL(state)
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/NewUrl", getURL).Methods("GET")
	r.HandleFunc("/auth", auth).Methods("GET")
	http.Handle("/", r)
	http.ListenAndServe(":8000", nil)

}

func getURL(w http.ResponseWriter, r *http.Request) {
	type state struct {
		S string
	}
	var st state
	hash := randToken()
	st.S = getLoginURL(hash)
	session, _ = store.Get(r, "session")
	session.Values["state"] = hash
	fmt.Print()
	err := sessions.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// json.NewEncoder(w).Encode(s)
	t, err := template.ParseFiles("./index.html")
	fmt.Println("okay")
	if err != nil {
		log.Fatal("Could not parse template files:", err)
	}
	er := t.Execute(w, st)
	if er != nil {
		log.Fatal("could not execute the files\n:", er)
	}
}

func auth(w http.ResponseWriter, r *http.Request) {
	// session, _ := store.Get(r, "session")
	retrievedstate := session.Values["state"]
	fmt.Println("retstate:", retrievedstate)
	q := r.URL.Query()
	state := q.Get("state")
	fmt.Println("state:", state)
	if state != retrievedstate {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error": "invalid session state"}`))
		return
	}
	code := q.Get("code")
	tok, err := conf.Exchange(oauth2.NoContext, code)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	client := conf.Client(oauth2.NoContext, tok)
	fbsession := &fb.Session{
		HttpClient: client,
		Version: "v7.0",
	}
	res, _ := fbsession.Get("/me", nil)
   fmt.Print(res)
	w.WriteHeader(http.StatusOK)
}
