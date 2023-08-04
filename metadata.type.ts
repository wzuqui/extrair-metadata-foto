export interface Metadata {
  Make: string;
  Model: string;
  Orientation: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  Software: string;
  DateTime: string;
  undefined: number;
  YCbCrPositioning: number;
  ExifIFDPointer: number;
  GPSInfoIFDPointer: number;
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: string;
  ISOSpeedRatings: number;
  ExifVersion: string;
  DateTimeOriginal: string;
  DateTimeDigitized: string;
  ComponentsConfiguration: string;
  ShutterSpeedValue: number;
  ApertureValue: number;
  BrightnessValue: number;
  ExposureBias: number;
  MeteringMode: string;
  Flash: string;
  FocalLength: number;
  SubjectArea: number[];
  MakerNote: number[];
  SubsecTimeOriginal: string;
  SubsecTimeDigitized: string;
  FlashpixVersion: string;
  ColorSpace: number;
  PixelXDimension: number;
  PixelYDimension: number;
  SensingMethod: string;
  SceneType: string;
  ExposureMode: number;
  WhiteBalance: string;
  FocalLengthIn35mmFilm: number;
  SceneCaptureType: string;
  GPSLatitudeRef: 'N' | 'S';
  GPSLatitude: number[];
  GPSLongitudeRef: 'E' | 'W';
  GPSLongitude: number[];
  GPSAltitudeRef: number;
  GPSAltitude: number;
  GPSSpeedRef: string;
  GPSSpeed: number;
  GPSImgDirectionRef: string;
  GPSImgDirection: number;
  GPSDestBearingRef: string;
  GPSDestBearing: number;
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  Compression: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  JpegIFOffset: number;
  JpegIFByteCount: number;
  blob: Blob;
}

export interface Blob {}
