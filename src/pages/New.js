import React, { Component } from 'react';

class New extends Component {

    render() {
        return (
            <form id="new-post">
                <input type="file" />

                <input
                    type="text"
                    name="author"
                    placeHolder="Autor do Post"
                />

                <input
                    type="text"
                    name="place"
                    placeHolder="Local do Post"
                />

                <input
                    type="text"
                    name="description"
                    placeHolder="Descrição do Post"
                />

                <input
                    type="text"
                    name="hashtags"
                    placeHolder="Hashtags do Post"
                />

                <button type="submit">Enviar</button> 

            </form>
        );
    }
}

export default New;