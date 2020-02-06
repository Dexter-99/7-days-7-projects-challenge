package main

import (
	"7-days-7-projects-challenge/youtubeStats/socket"
	"fmt"
	"net/http"
)

func homepage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Homepage")
}

// stats via a websocket connection
func stats(w http.ResponseWriter, r *http.Request) {
	ws, err := socket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}
	go socket.Writer(ws)
}

func main() {
	fmt.Println("YouTube Subscriber Monitor")
	http.HandleFunc("/", homepage)
	http.HandleFunc("/stats", stats)
	http.ListenAndServe(":8000", nil)
}
