"use client";

import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

/** Leaflet 地図上の「現在地」ボタン。権限拒否時はメッセージのみ（ソフトフェイル）。 */
export function LocateControl() {
  const map = useMap();
  const markerRef = useRef<L.CircleMarker | null>(null);

  useEffect(() => {
    const Locate = L.Control.extend({
      onAdd() {
        const wrap = L.DomUtil.create("div", "paymap-locate-wrap");
        const btn = L.DomUtil.create(
          "button",
          "paymap-locate-btn leaflet-bar",
          wrap,
        );
        btn.type = "button";
        btn.title = "現在地";
        btn.setAttribute("aria-label", "現在地");
        btn.textContent = "現在地";

        const msg = L.DomUtil.create("p", "paymap-locate-msg", wrap);
        msg.hidden = true;

        L.DomEvent.disableClickPropagation(wrap);
        L.DomEvent.on(btn, "click", (e) => {
          L.DomEvent.preventDefault(e);
          msg.hidden = true;

          if (!navigator.geolocation) {
            msg.textContent = "この端末は位置情報に対応していません";
            msg.hidden = false;
            return;
          }

          btn.disabled = true;
          btn.textContent = "取得中…";

          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const { latitude, longitude } = pos.coords;
              const latlng = L.latLng(latitude, longitude);
              map.setView(latlng, Math.max(map.getZoom(), 16));

              if (markerRef.current) {
                markerRef.current.setLatLng(latlng);
              } else {
                const circle = L.circleMarker(latlng, {
                  radius: 8,
                  color: "#0c1f1a",
                  weight: 2,
                  fillColor: "#3b82f6",
                  fillOpacity: 0.9,
                });
                circle.addTo(map);
                markerRef.current = circle;
              }

              btn.disabled = false;
              btn.textContent = "現在地";
            },
            () => {
              msg.textContent =
                "位置情報を取得できませんでした（権限を確認してください）";
              msg.hidden = false;
              btn.disabled = false;
              btn.textContent = "現在地";
            },
            { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
          );
        });

        return wrap;
      },
    });

    const control = new Locate({ position: "bottomright" });
    control.addTo(map);

    return () => {
      control.remove();
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [map]);

  return null;
}
