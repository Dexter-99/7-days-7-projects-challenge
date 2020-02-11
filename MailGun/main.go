package main

import (
	"github.com/mailgun/mailgun-go"
)

func SendSimpleMessage(domain, apiKey string) (string, error) {
	mg := mailgun.NewMailgun("sandbox2ec9d9277eb74efaa388ef873ef89e3b.mailgun.org", "a38e9d03ee917c2e061124f2c931a164-52b6835e-76c42372", "52b6835e-76c42372")
	m := mg.NewMessage(
		"Excited User <vashishtiv@gmail.com>",
		"Hello",
		"Testing some Mailgun!",
		"sandbox2ec9d9277eb74efaa388ef873ef89e3b.mailgun.org",
	)
	_, id, err := mg.Send(m)
	return id, err
}

func main() {
	SendSimpleMessage("sandbox2ec9d9277eb74efaa388ef873ef89e3b.mailgun.org", "a38e9d03ee917c2e061124f2c931a164-52b6835e-76c42372")

}
