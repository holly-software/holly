{ pkgs ? import <nixpkgs> {
    config = {
      allowUnfree = true;
      android_sdk.accept_license = true;
    };
  }
}:

let
  androidComposition =
    pkgs.androidenv.composeAndroidPackages {
      platformVersions = [ "29" "32" "33" ];
      buildToolsVersions = [ "30.0.3" ];
      abiVersions = [ "x86" "x86_64" ];
    };
in
pkgs.mkShell rec {
  packages = with pkgs; [
    bun

    act

    temurin-bin-17
    android-studio
  ];

  ANDROID_HOME = "${androidComposition.androidsdk}/libexec/android-sdk";
  ANDROID_SDK_ROOT = ANDROID_HOME;
  ANDROID_NDK_ROOT = "${ANDROID_HOME}/ndk-bundle";

  CAPACITOR_ANDROID_STUDIO_PATH = "${pkgs.android-studio}/bin/android-studio";
}
 