import React,{ Fragment, useEffect,useCallback, useState} from 'react';
import Header from '../../../components/header/Header';
import Post from '../../../components/post/Post';
import { Container } from '@material-ui/core';
import './timeline.css'
import { getPosts } from '../../../services/post';
import Upload from '../../../components/upload/Upload';
const TimeLine = () => {

    const [posts, setPosts] = useState([]);
    const fetchPost = useCallback(async () => {
        const response = await getPosts();
        setPosts(response.data);
    },[])

    useEffect(() => {
        fetchPost();
    },[fetchPost]);

    return(
        <Fragment>
            <Header/>
            <Container className="timeline">
                <Upload></Upload>
                {
                    posts.map((post) => {
                        return (
                            <Post key={post._id} post={post}/>
                        )
                    })
                }
            </Container>
         </Fragment>
    )
};

export default TimeLine;