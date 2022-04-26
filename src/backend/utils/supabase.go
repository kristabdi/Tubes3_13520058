package utils

import (
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func ConnectSupabase() {
	var err error
	Db, err = gorm.Open(postgres.Open(os.Getenv("SUPABASEURL")), &gorm.Config{})
	if err != nil {
		log.Fatalln("DB Connect Error")
	} else {
		log.Println("DB Connected")
	}
}
