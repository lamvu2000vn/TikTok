// Component
import { Container } from '../UI'
import Header from '../components/Header/Header'
import SideNav from '../components/SideNav/SideNav'
import VideosFeed from '../components/VideosFeed'

const Following = () => {
    return (
        <>
            <Header />
            <Container>
                <SideNav />
                <VideosFeed page="following" />
            </Container>
        </>
    )
}

export default Following