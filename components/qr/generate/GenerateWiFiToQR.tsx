"use client"

import React, { useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { MissingQRData, QRCode } from "@/components/qr/generate/GetQRCode";

interface WiFiDetails {
  ssid: string;      // Network SSID
  password: string;  // Network password
  encryption: 'WPA' | 'WEP' | 'nopass' | 'WPA2' | 'WPA3' | 'WPA/WPA2 Mixed'; // Encryption type
  isHidden: boolean; // Whether the network is hidden
}

/**
 * `GenerateWiFiToQR` is a React component that generates a QR code for connecting to a WiFi network.
 */
export const GenerateWiFiToQR: React.FC = () => {
  const [wifi, setWiFi] = useState<WiFiDetails>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    isHidden: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const generateWiFiContent = (): string => {
    return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.isHidden ? 'true' : 'false'};`;
  }

  return (
    <>
      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <p className='mb-2.5 flex gap-2 text-xs font-medium text-muted-foreground'>
            <InfoCircledIcon />
            Fill all necessary information to generate WiFi QR Code
          </p>

          {/* SSID Input */}
          <div className="space-y-2">
            <label htmlFor="wifi-ssid" className='field-label'>Network Name (SSID)</label>
            <input
              type="text"
              id="wifi-ssid"
              className="field-input"
              placeholder="WiFi Network Name"
              value={wifi.ssid}
              onChange={(e) => setWiFi({ ...wifi, ssid: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="wifi-password" className='field-label'>Network Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="wifi-password"
              className="field-input"
              placeholder="WiFi Password"
              value={wifi.password}
              onChange={(e) => setWiFi({ ...wifi, password: e.target.value })}
            />
            <button
              type="button"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? "Hide password" : "Show password"}
            </button>
          </div>

          {/* Encryption Type Selector */}
          <div className="space-y-2">
            <label htmlFor="wifi-encryption" className='field-label'>Encryption Type</label>
            <select
              className="field-input"
              name="wifi-encryption"
              id="wifi-encryption"
              value={wifi.encryption}
              onChange={(e) => setWiFi({ ...wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' | 'WPA2' | 'WPA3' | 'WPA/WPA2 Mixed' })}
            >
              <option value="WPA">WPA</option>
              <option value="WPA2">WPA2</option>
              <option value="WPA3">WPA3</option>
              <option value="WPA/WPA2 Mixed">WPA/WPA2 Mixed</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Encryption</option>
            </select>
          </div>

          {/* Hidden Network Checkbox */}
          <div className="flex items-center space-x-2 py-2.5">
            <input
              type="checkbox"
              id="wifi-hidden"
              className="w-4 h-4"
              checked={wifi.isHidden}
              onChange={(e) => setWiFi({ ...wifi, isHidden: e.target.checked })}
            />
            <label htmlFor="wifi-hidden" className='text-sm font-medium text-muted-foreground'>Hidden Network</label>
          </div>
        </section>
        <section className='w-full min-h-80 flex flex-col items-center justify-center'>
          {/* QR Code Generation */}
          {wifi.ssid.length > 0 ?
            <QRCode
              value={generateWiFiContent()}
              size={250}
            />
            :
            <MissingQRData />
          }
        </section>
      </article>
    </>
  )
}
