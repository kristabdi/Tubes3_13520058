package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
    "regexp"
)

var dnaRegex *regexp.Regexp = regexp.MustCompile("^[ATCG]+$")

func IsValidDNA(s string) bool {
	return dnaRegex.MatchString(s)
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
