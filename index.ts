import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'leaflet/dist/leaflet.css';
import './style.css';

import * as L from 'leaflet';
import EXIF = require('exif-js');
import DxConfig from 'devextreme/core/config';
import { loadMessages, locale } from 'devextreme/localization';
import DxForm from 'devextreme/ui/form';

import { messages } from './devextreme-pt';
import { Metadata } from './metadata.type';

loadMessages(messages);
locale('pt-BR');
DxConfig({
  forceIsoDateParsing: false,
});

const appDiv: HTMLElement = document.getElementById('app');
{
  const pre: HTMLPreElement = document.createElement('pre');
  const mapa_container: HTMLDivElement = document.createElement('div');
  const mapa = criaMapa(mapa_container);
  let marker: L.Marker;
  const thumbnail: HTMLImageElement = document.createElement('img');
  {
    thumbnail.style.height = '200px';
    thumbnail.style.objectFit = 'cover';
  }
  const form_container = document.createElement('div');
  let form: DxForm;
  const input: HTMLInputElement = document.createElement('input');
  {
    input.type = 'file';
    input.multiple = false;
    input.onchange = acaoOnChange(input, (data: Metadata, raw: ArrayBuffer) => {
      if (form === undefined) {
        form = new DxForm(form_container, {
          formData: data,
          labelLocation: 'left',
          colCount: 2,
        });
      }
      const blob = new Blob([raw], { type: data.SceneType });
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(blob);
      thumbnail.src = imageUrl;
      pre.textContent = JSON.stringify(data, null, 2);
      if (marker) {
        marker.remove();
      }
      if (data.GPSLatitudeRef && data.GPSLongitudeRef) {
        const latitude = dmsToDecimal(
          data.GPSLatitude[0],
          data.GPSLatitude[1],
          data.GPSLatitude[2],
          data.GPSLatitudeRef
        );
        const longitude = dmsToDecimal(
          data.GPSLongitude[0],
          data.GPSLongitude[1],
          data.GPSLongitude[2],
          data.GPSLongitudeRef
        );
        marker = new L.Marker(L.latLng(latitude, longitude), {
          icon: L.icon({
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
            iconUrl:
              'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
            shadowUrl:
              'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png',
          }),
        });
        marker.addTo(mapa);
        mapa.flyTo([latitude, longitude], 15);
      }
    });
  }
  appDiv.appendChild(input);
  appDiv.appendChild(mapa_container);
  appDiv.appendChild(thumbnail);
  appDiv.appendChild(form_container);
  appDiv.appendChild(pre);
}

function acaoOnChange(
  input: HTMLInputElement,
  callback: (data: object, raw: ArrayBuffer) => void
) {
  return function (event: Event) {
    const [file] = input.files;
    if (file === undefined) return;
    const file_reader = new FileReader();
    file_reader.onload = () => {
      const result = file_reader.result;
      if (result instanceof ArrayBuffer) {
        callback(EXIF.readFromBinaryFile(result) as Metadata, result);
      }
    };
    file_reader.readAsArrayBuffer(file);
  };
}

function criaMapa(container: HTMLDivElement) {
  container.style.height = '400px';
  const result = L.map(container, {
    center: L.latLng(-27.0877181, -48.6068847),
    zoom: 12,
  });
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 1,
    crossOrigin: true,
  }).addTo(result);
  setTimeout(() => {
    result.invalidateSize();
  }, 500);
  return result;
}

function dmsToDecimal(
  degrees: number,
  minutes: number,
  seconds: number,
  direction: string
) {
  // Verifica se a direção é norte ou leste (positiva) ou sul ou oeste (negativa)
  const sign = /[NE]/i.test(direction) ? 1 : -1;

  // Calcula o valor decimal para graus, minutos e segundos
  const decimal = sign * (Math.abs(degrees) + minutes / 60 + seconds / 3600);

  return decimal;
}
