import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {token} from "../context/token"
import {toast} from "react-toastify"
import Stars from "./Stars";

const Comments = ({updateComment}) => {
    const [inputs, setInputs] = useState({
        content: "",
        rating: 0
    })
    // ID de l'article
    const { id } = useParams();

    const handleChange = (e) => {
        const {name, value} = e.target;

        setInputs({...inputs, [name]: value})
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
                
        if (
            inputs.content.trim() === "" ||
            inputs.rating <= 0 ||
            inputs.rating > 5
        ) {
            return toast.error("Veuillez remplir tous les champs")
        }
        
        const res = await axios.post(`/api/comments/new/${id}`, inputs, {headers: token()})
        
        // Je passe via ma props pour envoyer le nouveau commentaire au composant PARENT
        updateComment(inputs)
        
        toast.success("Commentaire ajouté avec succès")
        
        // Je vide les champs du formulaire
        
        setInputs({
            content: "",
            rating: 0
        })
        
        } catch (e) {
            toast.error(e.response.data.message)
        }
    
    }

    return (
        <section className="">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="rating" className="font-semibold">Note</label>
                    <Stars rating={inputs.rating} setRating={(rating) => setInputs({...inputs, rating})} />
                </div>

                <label htmlFor="content" className="font-semibold">Commentaire</label>
                <textarea 
                    onChange={handleChange} 
                    value={inputs.content} 
                    name="content" 
                    id="content" 
                    className=" "
                ></textarea>

                <button className=" hover:bg-[#C8102E] transition duration-300">Envoyer</button>
            </form>
        </section>
    );
};

export default Comments;
