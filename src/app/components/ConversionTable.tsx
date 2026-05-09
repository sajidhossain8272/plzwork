"use client";

import React from "react";

const supportedFormats = ["JPEG", "PNG", "WEBP"];
const uploadFormats = [
  "PNG",
  "JPEG",
  "WEBP",
  "GIF",
  "BMP",
  "ICO",
  "HEIC",
  "HEIF",
];

const ConversionTable = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 py-10'>
      <h3 className='text-3xl font-semibold text-center text-[#0d161c] mb-4'>
        Supported Image Conversions
      </h3>
      <p className='text-center text-[#5f6c74] mb-6'>
        Below are the supported image format conversions available in Quick
        Convert.
      </p>

      <div className='overflow-x-auto rounded-lg border border-[#dde4da] bg-white shadow-sm'>
        <table className='w-full text-left text-sm divide-y divide-[#eef1ec]'>
          <thead className='bg-[#f4f6f2] text-[#40505a]'>
            <tr>
              <th className='p-3 border-b border-[#dde4da]'>Upload Format</th>
              <th className='p-3 border-b border-[#dde4da]'>Can Convert To</th>
            </tr>
          </thead>
          <tbody>
            {uploadFormats.map((format) => (
              <tr
                key={format}
                className='border-b border-[#eef1ec] hover:bg-[#fbfdf9] transition-colors'
              >
                <td className='p-3 font-medium '>{format}</td>
                <td className='p-3'>
                  {supportedFormats.includes(format)
                    ? supportedFormats.filter((f) => f !== format).join(", ")
                    : "WEBP, PNG, JPEG"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-6 rounded-lg border border-[#eadfa8] bg-[#fff9dc] p-4 text-sm text-[#514d34] shadow-sm'>
        <p className='mb-2 font-semibold'>Important Disclaimers:</p>
        <ul className='list-disc list-inside'>
          <li>
            <span className="font-bold">HEIC</span> and <span className="font-bold">HEIF</span> formats may take longer to process due to additional
            decoding requirements.
          </li>
          <li>
            This software is compatible with mobile devices, but due to lower
            processing power, conversions may take longer. High file size or
            bulk conversions may cause instability, except on high-end devices.
          </li>
          <li>Our conversion limit is determined by your device&apos;s processing power. That&apos;s why we say there&apos;s no fixed limit; your device sets the pace.</li>
          <li>We currently do not support <span className="font-bold">SVG</span> file format at this time. </li>
        </ul>
      </div>
    </section>
  );
};

export default React.memo(ConversionTable);
