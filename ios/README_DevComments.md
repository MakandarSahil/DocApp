## This README is used to add extra comments for particular commit by devs. This is for future references.##

After change in podfile, clean the cache and generate projext workspace.
Commands:
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
rm -rf ~/Library/Developer/Xcode/DerivedData
pod install
npx react-native run-ios --simulator="iPhone 16" --verbose