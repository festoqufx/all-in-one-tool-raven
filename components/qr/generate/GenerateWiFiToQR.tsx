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

  const generateWiFiContent = (): string => {
    return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.isHidden ? 'true' : 'false'};`;
  }

  return (
    <>
      <article className="grid w-full grid-cols-1 md:grid-cols-2">
        <section className='w-full md:min-h-80 '>
          <p className='font-medium text-xs text-gray-600 flex gap-2 mb-2.5'>
            <InfoCircledIcon />
            Fill all necessary information to generate WiFi QR Code
          </p>

          {/* SSID Input */}
          <div className="space-y-2">
            <label htmlFor="wifi-ssid" className='font-medium text-sm text-gray-600'>Network Name (SSID)</label>
            <input
              type="text"
              id="wifi-ssid"
              className="w-full border border-gray-500 p-2 rounded"
              placeholder="WiFi Network Name"
              value={wifi.ssid}
              onChange={(e) => setWiFi({ ...wifi, ssid: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="wifi-password" className='font-medium text-sm text-gray-600'>Network Password</label>
            <input
              type="password"
              id="wifi-password"
              className="w-full border border-gray-500 p-2 rounded"
              placeholder="WiFi Password"
              value={wifi.password}
              onChange={(e) => setWiFi({ ...wifi, password: e.target.value })}
            />
          </div>

          {/* Encryption Type Selector */}
          <div className="space-y-2">
            <label htmlFor="wifi-encryption" className='font-medium text-sm text-gray-600'>Encryption Type</label>
            <select
              className="w-full border border-gray-500 p-2 rounded"
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
            <label htmlFor="wifi-hidden" className='font-medium text-sm text-gray-600'>Hidden Network</label>
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
