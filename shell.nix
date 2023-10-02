{ pkgs ? import <nixpkgs> {
    config = {
      allowUnfree = true;
      android_sdk.accept_license = true;
    };
  }
}:

let androidComposition = pkgs.androidenv.androidPkgs_9_0;
in
pkgs.mkShell {
  packages = with pkgs; [
    bun
    android-studio
  ];

  ANDROID_SDK_ROOT = "${androidComposition.androidsdk}/libexec/android-sdk";
  ANDROID_NDK_ROOT = "${androidComposition.androidsdk}/libexec/android-sdk/ndk-bundle";

  CAPACITOR_ANDROID_STUDIO_PATH = "${pkgs.android-studio}/bin/android-studio";
}
 