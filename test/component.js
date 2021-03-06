import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Pic from '../lib/';

describe('Pic', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should render the first image in images', () => {
    const props = {
      alt: 'heart',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    const pic = mount(<Pic {...props} />);

    expect(pic.containsMatchingElement(
      <img
        alt={props.alt}
        src={props.images[0].url}
      />,
    )).to.equal(true);
  });

  it('should render the second image in images', () => {
    const props = {
      alt: 'heart',
      defaultIndex: 1,
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    const pic = mount(
      <Pic {...props} />,
    );

    expect(pic.containsMatchingElement(
      <img
        alt={props.alt}
        src={props.images[1].url}
      />,
    )).to.equal(true);
  });

  it('should render the last image in noscript', () => {
    const props = {
      alt: 'heart',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    const pic = render(<Pic {...props} />);

    expect(pic.find('noscript img').length).to.equal(1);
    expect(pic.find('noscript img').attr('src')).to.equal(props.images[1].url);
  });

  it('should not render image if props are not passed', () => {
    const pic = shallow(<Pic />);

    expect(pic.find('img')).to.have.length(0);
  });

  it('should check if image is in view once mounted', () => {
    const props = {
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    sandbox.spy(Pic.prototype, 'inViewHandler');
    mount(<Pic {...props} />);

    expect(Pic.prototype.inViewHandler.callCount).to.equal(1);
  });

  it('should call componentWillUnmount when unmounted', () => {
    const props = {
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    sandbox.spy(Pic.prototype, 'componentWillUnmount');
    const wrapper = mount(<Pic {...props} />);
    wrapper.unmount();
    expect(Pic.prototype.componentWillUnmount.callCount).to.equal(1);
  });

  it('should set optimal image if renderOutOfView is true', () => {
    const props = {
      renderOutOfView: true,
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };

    sandbox.spy(Pic.prototype, 'setResponsiveImage');
    mount(<Pic {...props} />);

    expect(Pic.prototype.setResponsiveImage.callCount).to.equal(1);
  });

  it('should set blur to false by default', () => {
    const props = {
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };
    const pic = render(<Pic {...props} />);

    expect(pic.find('img').last().attr('style')).to.not.contain('blur');
  });

  it('should set blur style based if shouldBlur prop is true', () => {
    const props = {
      shouldBlur: true,
      blurAmount: '10px',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };
    const pic = render(<Pic {...props} />);

    expect(pic.find('img').last().attr('style')).to.contain(
      `blur(${props.blurAmount});`,
    );
  });

  it('should set blur style based on blurAmount prop', () => {
    const props = {
      shouldBlur: true,
      blurAmount: '20px',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };
    const pic = render(<Pic {...props} />);

    expect(
      pic.find('img').last().attr('style'),
    ).to.contain(`blur(${props.blurAmount});`);
  });

  it('should override img style if imgStyle prop is set', () => {
    const props = {
      imgStyle: {
        backgroundColor: 'red',
      },
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };
    const pic = render(<Pic {...props} />);

    expect(pic.find('img').last().attr('style')).to.contain(
      `background-color:${props.imgStyle.backgroundColor};`,
    );
  });

  it('should override container style if baseStyle prop is set', () => {
    const props = {
      baseStyle: {
        backgroundColor: 'red',
      },
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: 'http://placehold.it/320?text=♥',
        },
      ],
    };
    const pic = render(<Pic {...props} />);

    expect(pic.find('div').first().attr('style')).to.contain(
      `background-color:${props.baseStyle.backgroundColor};`,
    );
  });

  it('should not render if a url in images is not a string', () => {
    const props = {
      alt: 'heart',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 320,
          url: {},
        },
      ],
    };

    const wrapper = shallow(<Pic {...props} />);
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should not render if a width in images is not a number', () => {
    const props = {
      alt: 'heart',
      images: [
        {
          width: 290,
          url: 'http://placehold.it/290?text=♥',
        },
        {
          width: 'test',
          url: 'http://placehold.it/290?text=♥',
        },
      ],
    };

    const wrapper = shallow(<Pic {...props} />);
    expect(wrapper.find('img')).to.have.length(0);
  });

  it('should not render if no images passed through', () => {
    const props = {
      alt: 'heart',
      images: [],
    };

    const wrapper = shallow(<Pic {...props} />);
    expect(wrapper.find('img')).to.have.length(0);
  });
});
