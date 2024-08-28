import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));
const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));
// set a height and width to the carousal container
const CarouselContainer = styled.div(() => ({
  position: 'relative',
  overflow: 'hidden',
  width: '300px',
  height: '320px',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  transition: 'transform 0.3s ease',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 100%',
  width: '100%',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  width: '50px',
  zIndex: 1,
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '10px ',
}));

const UserAvatar = styled.div(() => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#808080',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  marginRight: '20px',
}));

const UserDetails = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const UserName = styled.span(() => ({
  fontWeight: 'bold',
}));

const UserEmail = styled.span(() => ({
  fontSize: '0.9em',
  color: '#666',
}));

const Post = ({ post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === post.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? post.images.length - 1 : prevIndex - 1,
    );
  };
  //Show the first letter for both the first and last names.
  const getInitials = name => {
    if (!name) return 'AS'; // Return an empty string if name is undefined or null
    const names = name.split(' ');
    return names.map(n => n[0]?.toUpperCase() || '').join('');
  };

  return (
    <PostContainer>
      {post.user && (
        <UserInfo>
          <UserAvatar>{getInitials(post.user.name)}</UserAvatar>
          <UserDetails>
            <UserName>{post.user.name}</UserName>
            <UserEmail>{post.user.email}</UserEmail>
          </UserDetails>
        </UserInfo>
      )}
      <CarouselContainer>
        <Carousel style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image
                src={image.url}
                alt={`${post.title} - Image ${index + 1}`}
              />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      }),
    ),
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
  }).isRequired,
};

export default Post;
