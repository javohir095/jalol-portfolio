import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'
import ResumePage from './pages/ResumePage'
import VideoPage from './pages/VideoPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/blog"      element={<BlogPage />} />
        <Route path="/blog/:id"  element={<PostPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/resume"    element={<ResumePage />} />
        <Route path="/videos"    element={<VideoPage />} />
        <Route path="*"          element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
