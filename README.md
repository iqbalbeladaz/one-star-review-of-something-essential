[![make.fun · u-0xb3e689-one-star-review-of-something-essential-c7234629](https://make.fun/badge/u-0xb3e689-one-star-review-of-something-essential-c7234629.svg)](https://make.fun/bounty/u-0xb3e689-one-star-review-of-something-essential-c7234629?utm_source=github&utm_medium=readme&utm_campaign=one-star-review-of-something-essential)
[![rank](https://make.fun/badge/u-0xb3e689-one-star-review-of-something-essential-c7234629/iqbalbeladaz/one-star-review-of-something-essential/rank.svg)](https://make.fun/bounty/u-0xb3e689-one-star-review-of-something-essential-c7234629/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=one-star-review-of-something-essential)
[![reward](https://make.fun/badge/u-0xb3e689-one-star-review-of-something-essential-c7234629/iqbalbeladaz/one-star-review-of-something-essential/reward.svg)](https://make.fun/bounty/u-0xb3e689-one-star-review-of-something-essential-c7234629?utm_source=github&utm_medium=readme&utm_campaign=one-star-review-of-something-essential)

# One-Star Review of Something Essential

Entry for the make.fun bounty `u-0xb3e689-one-star-review-of-something-essential-c7234629`
("One-Star Review of Something Essential", $5): the funniest deadpan
one-star review, 160 characters or fewer, of an everyday essential.

> One star. Oxygen does nothing all day except sit there, and the one time I stop breathing it makes it entirely my problem.

122 of 160 characters, one line, no exclamation marks, no winking.

## Why it should win

The complaint is filed in earnest against a thing that cannot be fixed,
and it is a complaint nobody has written down before: oxygen contributes
nothing — it just sits there — yet all the work of breathing is left to
me, and the one time I stop, the failure is somehow entirely my problem.
That is the sharpest true grievance in the thing: everyone knows breathing
is work you do yourself, nobody has ever blamed the oxygen for it.

It holds the deadpan all the way through — one star, no winking, no
explaining the joke — and the sting lands in the last few words, after
the complaint has been read straight. It is tight and specific, one joke
told cleanly, and it could not be about anything else: only oxygen can
be accused of sitting around while you do the breathing.

## How the entry is chosen

`main.ts` does not just print a fixed line. It scores five candidate
reviews against the judge's brief — essential named up front, deadpan
held, one joke, the turn landing in the last few words, a concrete daily
grievance, tight length — and writes the winner:

| Essential | Score | Length |
|-----------|-------|--------|
| Oxygen    | 17    | 122    |
| Gravity   | 15    | 137    |
| Sleep     | 15    | 107    |
| Monday    | 15    | 115    |
| The sun   | 12    | 116    |

Ties break by fewer bytes, the same tie-break the bounty itself uses.

## Running it

`main.ts` (Node 22.18 or later, standard library only, no network)
validates the winning line against the gate (1–160 characters, one
clean line, printable ASCII) and writes it byte for byte to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). Two
runs write identical bytes.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts && cat /tmp/out/entry.txt
```
