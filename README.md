# Fish Fate

![alt tag](./www/img/fishDemo_2.gif)

This ionic built application is used to demonstrate a random number generator by tracking fish
movements. This app has the following features: magic 8-ball responses, dice roller, coin flip, lottery
number generation, and more nerdy random generation uses.

---

### Table of Contents
 - [Installation](#installation)
 - [Build](#build)
 - [Usage](#usage)
 - [Contributing](#contributing)
 - [License](#license)
 
---

### Installation

Before ionic can build the application you need to install the platform tools needed.
This app can be built with android or ios (windows not tested). You can get nice instructions on
installing the [Android JDK here](http://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html),
for iOS build, simply download and install the xcode dev tools from the market.

1.  Download and Install the latest stable version of [node.js and npm](https://nodejs.org/en/)

2.  check to make sure you have node and npm installed correctly.
    ```
    node -v && npm -v
    ```
    You should see output like the following:
    ```
    v4.4.4
    3.10.5
    ```
    this project should not be picky on which versions used, however this was only tested
    on versions > 4.
    
3.  Install ionic and cordova
    ```
    npm install -g ionic cordova
    ```
    
4.  Were done.

---

### Build

Building the project is made super easy with ionic. Anywhere there is a `<platform>` swap that out for 
your desired platform, either `ios` or `android`.

0.  Clone the repo
    ```
    git clone https://github.com/FishyByte/FishFate.git
    ```

1.  Install npm dependencies.
    ```
    npm install
    ```
    
2.  Add the desired platform. Swap `<platform>` for either `ios` or `android`
    ```
    ionic platform add <platform>
    ```

2.  Install the plugins, This app uses the following cordova plugins
    `CopyToClipboard`, `inAppBroweser`, and `appRate`. 
    ```
    cordova plugin add https://github.com/VersoSolutions/CordovaClipboard.git
    cordova plugin add cordova-plugin-inappbrowser
    cordova plugin add https://github.com/pushandplay/cordova-plugin-apprate.git
    ```
    

3. Now we can build the project.
   ```
   ionic build <platform>
   ```
   Ionic will let you know if the project build was successful or not.
   
---

### Usage

For testing the application locally use `ionic serve` to launch it with your web browser.
For emulating android builds I would recommend installing [genymotion](https://docs.genymotion.com/).
Once installed customize an emulated device, and launch it, then run this command.
```
ionic emulate android
```
This should recognize genymotion automatically, then port the app over to the device for you. 

If emulators are not your style then you can usb transfer the .apk to your android device. This file
can be found at `platforms/android/build/outputs/apk/android-debug.apk`. Once the .apk is on your device
you will need to go into the settings to allow untrusted apps, and then install the .apk with any third
party file manager/explorer app from the google play market.

---

###  Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

---

### License 

[MIT](./LICENSE)
