# Here I will have two seperate versions:

## 1. The one that should actually work and does work on Android.
### added to main branch
## 2. The one that works otherwise correctly on my IOS phone, but requires a re-rendering for the markers to appear with the long press.
### added to a seperate branch

## more about
I had a problem with IOS on the markers when I change them from null to an array in the useState since none of my attempts to fix them worked completely. 
The markers initially came one state behind do they required me to press long twice before the first one showed on the map. 
I did try and have debugging in the code and it showed that everything worked on the code level with the 1. code I will commit, but for the app to work on my IOS i needed to add a key to get the markers to appear on time, so when pressing for long.
