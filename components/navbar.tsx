import { Menu } from "lucide-react"
import { Button } from "./ui/button"

function Navbar(){
    return (
        <div className="flex items-center p-4">
            <Button>
                <Menu></Menu>
            </Button>
        </div>
    )
}
export default Navbar