import {useEffect, useState} from "react";

import'../../../signup.css';
export default function CarInput(visitem){

    const [numCars, setNumCars] = useState(0);

    const [carForm1, setCarForm1] = useState({
        pcn1: "",
        vim1: ""
    })

    const [carForm2, setCarForm2] = useState({
        pcn2: "",
        vim2: ""
    })



    useEffect(() => {

        for (var i = 0; i < localStorage.length; i++){
            console.log('car storage: '+localStorage.getItem(localStorage.key(i)));
        }

    }, []);

    function onNumCarsChange(e){
        const val = e.target.value;
        console.log('onCarsChange: '+val);
        setNumCars(val);
    }

    function handleCarChange1(event) {

        const {value, name} = event.target
        setCarForm1(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    function handleCarChange2(event) {

        const {value, name} = event.target
        setCarForm2(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    function submitCarChange(event) {

        localStorage.setItem("pcn1", carForm1.pcn1);
        localStorage.setItem("vim1", carForm1.vim1);

        if (carForm2.pcn2){
            localStorage.setItem("pcn2", carForm2.pcn2);
            localStorage.setItem("vim2", carForm2.vim2);
        }

        event.preventDefault();


        visitem.onDataChange("contacts");

    }

    return (
        <div>
            <div>
                <select name="numofcars" onChange={onNumCarsChange}>
                    <option value="0" selected>0 Cars</option>
                    <option value="1">1 Car</option>
                    <option value="2">2 Cars</option>
                </select>

                {/*<input type="radio" value="1" name="numofcars" onChange={onNumCarsChange} />*/}
                {/*<label >1</label>*/}
                {/*<input type="radio" value="2" name="numofcars" onChange={onNumCarsChange} />*/}
                {/*<label >2</label>*/}
            </div>
            {numCars === "1" &&
                <form>
                    <label id="labelreg">Payment Charge Notice (PCN):</label>
                    <input onChange={handleCarChange1} type="text" name="pcn1"
                           text={carForm1.pcn1} value={carForm1.pcn1} required/>
                    <label id="labelreg" >Vehicle Registration (VIM):</label>
                    <input onChange={handleCarChange1} name="vim1" type="text"
                           text={carForm1.vim1} value={carForm1.vim1} required/>
                    <div className="form-group">
                        <button id="regbut" onClick={submitCarChange}>Submit</button>
                    </div>
                </form>
            }
            {numCars === "2" &&
                <form>
                    <label id="labelreg" htmlFor="username">Payment Charge Notice (PCN):</label>
                    <input onChange={handleCarChange1} text={carForm1.pcn1} value={carForm1.pcn1}
                           type="text"   required/>
                    <label id="labelreg" >Vehicle Registration (VIM):</label>
                    <input onChange={handleCarChange1} text={carForm1.vim1} value={carForm1.vim1}
                           type="text" />
                    <label id="labelreg" htmlFor="username">2nd Payment Charge Notice (PCN):</label>
                    <input onChange={handleCarChange2} type="text"
                           text={carForm2.pcn2} value={carForm2.pcn2} required/>
                    <label id="labelreg" >2nd Vehicle Registration (VIM):</label>
                    <input onChange={handleCarChange2} type="text"
                           text={carForm2.vim2} value={carForm2.vim2} required />
                    <div className="form-group">
                        <button id="regbut" onClick={submitCarChange}>Submit</button>
                    </div>
                </form>
            }

        </div>

    )

}