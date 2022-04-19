package models

import "time"

type Disease struct {
	Name      string    `json:"name"`
	Sequence  string    `json:"sequence"`
	CreatedAt time.Time `json:"created_at"`
}

type History struct {
	Name       string    `json:"name"`
	Penyakit   string    `json:"penyakit"`
	Similarity float32   `json:"similarity"`
	IsTrue     bool      `json:"isTrue"`
	CreatedAt  time.Time `json:"created_at"`
}

type QueryMatch struct {
	Name     string `json:"name"`
	Sequence string `json:"sequence"`
	Penyakit string `json:"penyakit"`
	Mode     string `json:"mode"`
}
