package main

import (
	"7-days-7-projects-challenge/MMILregisteration/database"
	"fmt"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
)

var cl *mongo.Collection
var c *mongo.Client

func init() {
	cl, c = database.Createdb()
}

func main() {
	r := NewRouter()
	r.HandleFunc("/Register", register).Methods("GET", "POST")
	// r.HandleFunc("/Congrats", FormSubmitted).Methods("GET")
	http.Handle("/", r)
	http.ListenAndServe(":9098", nil)
}

//NewRouter .....
func NewRouter() *mux.Router {
	r := mux.NewRouter().StrictSlash(true)
	r.PathPrefix("/static").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	return r
}

func register(w http.ResponseWriter, r *http.Request) {

	switch r.Method {

	case "GET":
		{

			fmt.Println("yeh chlra hai")
			t, err := template.ParseFiles("C:/Users/yashi/go/src/7-days-7-projects-challenge/MMILregisteration/index.html")
			if err != nil {
				log.Fatal("Could not parse template files\n")
			}
			er := t.Execute(w, "")
			if er != nil {
				log.Fatal("could not execute the files\n")
			}
		}
	case "POST":
		{
			fmt.Println(" lets see if it works ")
			r.ParseForm()
			data := database.Data{

				Name:      r.FormValue("username"),
				Email:     r.FormValue("email"),
				Course:    r.FormValue("course"),
				PhoneNo:   r.FormValue("phone"),
				Year:      r.FormValue("year"),
				Interests: r.Form["interests"],
			}
			fmt.Print(data)
			database.Insertintodb(cl, data)
			http.Redirect(w, r, "/Congrats", 302)

		}
	}

}
