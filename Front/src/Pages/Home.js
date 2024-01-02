import { useEffect } from "react";
import Banner from "../Components/Home Components/Banner";

function Home(){
    useEffect(()=>{
        document.body.className = `main-layout`
    }, [])
    return (
        <>
            <Banner/>
        </>
    )
}
export default Home;