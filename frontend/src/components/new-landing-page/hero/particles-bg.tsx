"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import {loadFull} from 'tsparticles';

export default function ParticlesBg() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async engine => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = useMemo(
        () => ({
            fullScreen: {
                enable: false,
                zIndex: -1,
            },
            particles: {

                number: {
                    value: 500,
                    density: {
                        enable: true,
                    },
                },
                color: {
                    value: "#AE00FE",
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: {
                        max: 0.7,
                        min: 0.3
                    },
                },
                size: {
                    value: 2,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "left",
                    straight: true,
                },
                wobble: {
                    enable: true,
                    distance: 10,
                    speed: 10,
                },
                zIndex: {
                    value: {
                        min: 0,
                        max: 100,
                    },
                    opacityRate: 10,
                    sizeRate: 10,
                    velocityRate: 10,
                },
            },
            
            
        }),
        []
    );

    if (init) {
        return (
            <Particles
                className="h-full w-full absolute"
                id="tsparticles"
                options={options}
            />
        );
    }

    return <></>;
}
