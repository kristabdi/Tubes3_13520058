package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// run with go test -v ./...

func TestCalculateSimiliarity(t *testing.T) {
	ratio := CalculateSimiliarity("AACTGATGCATG", "ACAAGCTAG")
	t.Logf("Ratio: %f", ratio)
}

func TestIsValidDNA(t *testing.T) {
	tests := []struct {
		name string
		dna  string
		want bool
	}{
		{"empty string", "", false},
		{"only 1 letter", "A", true},
		{"random", "ACTGTGGATC", true},
		{"incorrect 1 char", "ACTGTG GATC", false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := IsValidDNA(tt.dna)
			assert.Equal(t, tt.want, got)
		})
	}
}
