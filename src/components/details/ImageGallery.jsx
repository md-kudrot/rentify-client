import Image from "next/image"
import React from "react"
// import Icon from '../Icon';

export default function ImageGallery({ image }) {
    console.log(image?.images)

    const images = image?.images || [
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
            alt: "Property Image 1",
            className: "col-span-2 row-span-2",
            hasOverlay: true,
            hasButton: true
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
            alt: "Property Image 2",
            className: "col-span-1 row-span-1"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
            alt: "Property Image 3",
            className: "col-span-1 row-span-1"
        },
        {
            src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbkn9-GpDB0Rcvyh-qH6I3p2XXsPzP8eWJAt5IdpBR1005a-EMuIMlBXe01qcxzA9C5s_4gTERfEDdhVJenh5vGhjgI3BdWGs7ssREn4X7GQaEyLKWDuCN1JzaVycnOQLJ1Iu2zSrQkzT1_XF5nzqM3ByQ4LUOy-4FhBmAQzxRknLi7oOjwb-_ch-kN-oXIKvBoEtBXet7HUEzyyrpgDZKYBHKpMrzNluGCuoP81JCkfCYGJxuvGWDmul7uzVeBwfzR0CRm3hnu5E",
            alt: "Property Image 4",
            className: "col-span-1 row-span-1"
        }
    ]

    return (
        <section className="mb-10  gap-4">
            {images.map((img, i) => (
                <div
                    key={i}
                    className={`${img.className} h-[40rem] w-[100%] overflow-hidden rounded-[24px] group cursor-pointer`}
                >
                    {/* {console.log(img)} */}
                    <Image
                        height={600}
                        width={800}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        alt={img?.alt || `Property Image ${i + 1}`}
                        src={img || "https://via.placeholder.com/800x600?text=Property+Image"}
                    />
                    {/* {img.hasOverlay && (
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    {img.hasButton && (
                        <button className="absolute bottom-4 right-4 bg-[#0B1120]/90 backdrop-blur-md px-4 py-2 rounded-lg text-[#ffb77e] font-bold flex items-center gap-1.5 shadow-lg hover:bg-[#0B1120] transition-all text-[14px]">
                            <Icon name="grid_view" size={20} />
                            <span>Show all photos</span>
                        </button>
                    )} */}
                </div>
            ))}
        </section>
    )
}

