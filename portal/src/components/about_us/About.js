import React,{useState,useEffect} from 'react'
import style from './styling.module.css'
import back1 from '../../assets/back1.jpg'


export default function About() {
    return (
        <div>
            <div className={style.box}>
                <div className={style.aboutbox}>
                <img className={style.back1} src={back1} />
                <div className={style.tag1}>Defence Research and Development Organisation</div>
                </div>

                <div className={style.description}>
                    <div>DRDO is the R&D wing of Ministry of Defence, Govt of India, with a vision to empower India with cutting-edge defence technologies and a mission to achieve self-reliance in critical defence technologies and systems, while equipping our armed forces with state-of-the-art weapon systems and equipment in accordance with requirements laid down by the three Services. DRDO's pursuit of self-reliance and successful indigenous development and production of strategic systems and platforms such as Agni and Prithvi series of missiles; light combat aircraft, Tejas; multi-barrel rocket launcher, Pinaka; air defence system, Akash; a wide range of radars and electronic warfare systems; etc., have given quantum jump to India's military might, generating effective deterrence and providing crucial leverage.</div>
                    <br />
                    <div>"Balasya Mulam Vigyanam"—the source of strength is science-drives the nation in peace and war. DRDO has firm determination to make the nation strong and self-reliant in terms of science and technology, especially in the field of military technologies.</div>
                    <br />
                    <div>DRDO was formed in 1958 from the amalgamation of the then already functioning Technical Development Establishment (TDEs) of the Indian Army and the Directorate of Technical Development & Production (DTDP) with the Defence Science Organisation (DSO). DRDO was then a small organisation with 10 establishments or laboratories. Over the years, it has grown multi-directionally in terms of the variety of subject disciplines, number of laboratories, achievements and stature.</div>
                    <br />
                    <div>Today, DRDO is a network of more than 50 laboratories which are deeply engaged in developing defence technologies covering various disciplines, like aeronautics, armaments, electronics, combat vehicles, engineering systems, instrumentation, missiles, advanced computing and simulation, special materials, naval systems, life sciences, training, information systems and agriculture. Several major projects for the development of missiles, armaments, light combat aircrafts, radars, electronic warfare systems etc are on hand and significant achievements have already been made in several such technologies.</div>
    
                </div>

                <div className={style.visionbox}>

                    <div className={style.vision}>
                        <div className={style.tagv}>Vision</div>
                        <div className={style.desc}>Empowering the nation with state-of-the-art indigenous Defence technologies and systems.</div>
                    </div>

                    <div className={style.mission}>
                    <div className={style.tagm}>Mission</div>
                    <div className={style.desc}>
                    <li>Design, develop and lead to production state-of-the-art sensors, weapon systems, platforms and allied equipment for our Defence Services.</li>
                    <li>Provide technological solutions to the Services to optimise combat effectiveness and to promote well-being of the troops.</li>
                    <li>Develop infrastructure and committed quality manpower and build strong indigenous technology base.</li>
                    </div>   
                    </div>

                </div>
            </div>
        </div>
    )
}
