// Component
import { Container } from '../UI'
import Header from '../components/Header/Header'
import SideNav from '../components/SideNav/SideNav'
import VideosFeed from '../components/VideosFeed'

const ForYou = () => {
    return (
        <>
            <Header />
            <Container>
                <SideNav />
                <VideosFeed page="for-you" />
            </Container>
        </>
    )
}

export default ForYou