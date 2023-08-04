{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs-16_x
    nodePackages.pnpm

    temurin-jre-bin
    android-studio

    python311
    poetry
  ];

  CAPACITOR_ANDROID_STUDIO_PATH = "${pkgs.android-studio}/bin/android-studio";
}
