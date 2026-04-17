"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MovieSlider() {

    const banners = [
        "/banners/banner1.jpg",
        "/banners/banner2.avif",
        "/banners/lumineersticketingbanner.avif",
        "/banners/wickedforgood.avif",
    ]; 

    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div className="">
            <div className="w-full overflow-hidden  text-black">

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "center",
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                    className="w-full"
                >
                    {/* This padding creates center focus */}
                    <CarouselContent className="">
                        {banners.map((banner, index) => (
                            <CarouselItem
                                key={index}
                                className="
                pl-4
                basis-[90%]
                md:basis-[65%]
                lg:basis-[70%]
              "
                            >
                                <div className="relative   rounded-xl">
                                    <Image
                                        src={banner}
                                        alt={`banner-${index}`}
                                        width={1240}
                                        height={300}
                                        priority={index === 0}
                                        className="object-cover rounded-2xl"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className="flex justify-center gap-4 mt-4">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 rounded-full transition-all 
                                ${current === index
                                    ? "w-2 bg-neutral-800 "
                                    : "w-2 bg-neutral-400"
                                }`}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

