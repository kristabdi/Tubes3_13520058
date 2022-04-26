package utils

func KMPMatch(dna string, disease string) bool {
	lenDisease := len(disease)
	lenDna := len(dna)

	if lenDisease > lenDna {
		return false
	}

	var fail = make([]int, lenDisease)

	var i, j int
	i = 0
	j = 0

	for i < lenDna {
		if disease[j] == dna[i] {
			if j == lenDisease-1 {
				return true
			}
			i++
			j++
		} else {
			if j > 0 {
				// Get the first index after same prefix suffix
				j = fail[j-1]
			} else {
				// If first time fail, compare next character in DNA
				i++
			}
		}
	}
	return false
}

func LongestPrefixSuffix(disease string) []int {
	// Compute fail array which stores length same prefix suffix
	lenDisease := len(disease)
	var lps = make([]int, lenDisease)
	lps[0] = 0

	var i, j int
	j = 0
	i = 1
	for i < lenDisease {
		if disease[i] == disease[j] {
			lps[i] = j + 1
			i++
			j++
		} else {
			if j != 0 {
				j = lps[j-1]
			} else {
				lps[i] = 0
				i++
			}
		}
	}

	return lps
}
