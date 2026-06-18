import React from "react"
// import Icon from '../Icon';

export default function ImageGallery() {
    const images = [
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMlVoEzd-zICvv0l7tHOV3_nazjnSgzzLsCclqk944KwKAzKhkTMqK8xvFkF_EP4hmq1I7T_vV3giMtfoAjcMZ_XcdtAx7f8q6LhkiQzkpmAktK3J6uZ2gfxBXC-jxLKELdZrbqUmgBh85PCKG_iE-Z6cWU-t26tZ3w8CZFRh4bWO1ziMRymOkY7pzVAUk5q9aGCvzHkA_v3S_HsOwkhG54RFyj9JAefsAuVatLbHD0Ngj3T1bbq-25DLrHP0bFgHBNHmFOWPleqU",
            alt: "Living Room",
            className: "md:col-span-2 md:row-span-2 relative",
            hasOverlay: true
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgkdlfPgfn5csl0sq1b-g8_-eQftZj7qfrtRda6Mg22mNKAs-MKxJpepQofLjFpNoIE2zrZJucMkjMugZEoylAY1V8Bze9Ybn6rkvfMiqZdi6i5SbUsup4ACWbl03NX_liBfZoCpUEYUjDKYDYQDuQq9b3gD7LWk3-5DH4ArMFZYaffd3hcFHAKHlnj_CewyDiVIN4zdcsXtGU9w1qIdo18yNdykJl4MFutXZ73zfRehx2s4RU7weRcyQAYCyuAlhTBKGAeQDsHFs",
            alt: "Kitchen",
            className: "md:col-span-1 md:row-span-1",
            hasOverlay: false
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmXE-09bzFnkvPb7nhSmkCOOeJmsZeXxsZ7MSdmFPwdDrata-28v_EFn7akQbG00G5BEdBvMP7z1TBHh4UmlOGciWr_EJzaI5qEAcLT_6FDfXl-d_LlQkET8QbWw8cjGh4-oFQ2JojEk1EQdzNau7iobfDasMaeCU2kOb3BzG6uSbbOL9348HIlOKOzfmg9UKnOqbjPvB6Ec2QCwXS0fVdnpc3B8eOXc8sqBp12qOWfkCtlpb30W3tqjlc7x6Q5KETw7xSno3G9z8",
            alt: "Bedroom",
            className: "md:col-span-1 md:row-span-1",
            hasOverlay: false
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEVLQpFTKuXqqKxy14--7dmP4HAL8hlKiIFdePAjtuEjDlju5uEu7mEvFpXh2N0PdKKwxCLNpVvoTPPXG6ySgzUNTTlKdSE4kk9s_yJQoVGHWjWmKtyNzKBrrxdm7okuJqECGIXRQRuMkMeXc0GTC301KgfT3UuPuBGkByVuWW6kG01Fa2iDCMWVj0EvFEhISn4acCgPRV8tnJB-6GVxg5C_EF9p13oCQWgE2IAQh2Qix-kXAUUlo6yFcwZfL_BhOC8xwjNVBG8Ro",
            alt: "Infinity Pool",
            className: "md:col-span-2 md:row-span-1 relative",
            hasOverlay: false,
            hasButton: true
        }
    ]

    return (
        <section className="mb-10 grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px]">
            {images.map((img, i) => (
                <div key={i} className={`${img.className} overflow-hidden rounded-[24px] group cursor-pointer`}>
                    <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={img.alt}
                        src={img.src}
                    />
                    {img.hasOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    {img.hasButton && (
                        <button className="absolute bottom-4 right-4 bg-[#0B1120]/90 backdrop-blur-md px-4 py-2 rounded-lg text-[#ffb77e] font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#0B1120] transition-all text-[14px]">
                            {/* <Icon name="grid_view" size={20} /> */}
                            <span>Show all photos</span>
                        </button>
                    )}
                </div>
            ))}
        </section>
    )
}

