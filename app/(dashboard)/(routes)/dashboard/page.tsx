import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { UserButton } from "@clerk/nextjs"

function DashBoardPage(){

    return(
        <>
        <div className="">
            this is DashBoardPage
            <UserButton/>
            <Navbar/>
        </div>
        </>
    )
}
export default DashBoardPage