import React, { Component } from 'react';
import api from '../services/api';
import io from 'socket.io-client';

import { endpoint } from '../consts';

import './Feed.css';

import more from '../assets/more.png';
import like from '../assets/like.png';
import comment from '../assets/comment.png';
import send from '../assets/send.png';

class Feed extends Component {

    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket();

        const response = await api.get('posts');

        this.setState({ feed: response.data });
    }

    registerToSocket = () => {
        const socket = io(`http://${endpoint}/`);

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] });
        })

        socket.on('like', likedPost => {
            this.setState({ 
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post    
                 ) 
            });
        })
    }

    handleLike = id => {
        api.post(`/posts/${id}/like`);    
    }

    render() {
        return (
            <section id="post-list">
                { this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span>{post.author}</span>
                                <span className="place">{post.place}</span>
                            </div>

                            <img src={more} alt="Mais" />
                        </header>

                        <img src={`http://${endpoint}/files/${post.image}`} alt="Mais" />

                        <footer>
                            <div className="actions">
                                <button type="button" onClick={ ()=> this.handleLike(post._id) }>
                                    <img src={like} alt="Mais" />
                                </button>
                                <img src={comment} alt="Mais" />
                                <img src={send} alt="Mais" />
                            </div>

                            <strong>{post.likes} curtidas</strong>
                            <p>
                                {post.description}
                                <span>{post.hashtags}</span>
                            </p>
                        </footer>

                    </article>
                ))}

            </section>
        );
    }
}

export default Feed;