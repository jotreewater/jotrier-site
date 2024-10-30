import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { AiOutlineFilePdf } from 'react-icons/ai';
import { AiOutlineProject } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { RiArticleLine } from 'react-icons/ri';

import Card from '../components/Card';
import './Home.css';
import headshot from '../assets/fire1000.jpg';
import pdf from '../assets/resume_08.29.2024.pdf';

export default function Home() {
  return (
    <>
      <section className="heading">
        <h1>Hello, my name is Joseph</h1>
        <p>
          ...and this is my website <span className="rotating-element">🎉</span>
        </p>
      </section>

      <section className="bg-color-red-alt">
        <div className="section-header bounce">
          <h2>Scroll for more</h2>
          <div>
            <FiChevronDown style={{ transform: 'scaleX(2)' }} />
          </div>
        </div>
        <div className="container-3col">
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
            title="About Me"
          >
            <div>
              <div className="media-container">
                <img src={headshot} alt="Joseph.png" className="headshot"></img>
              </div>
              <div>
                <p>
                  Joseph is a Software Engineer and Technology Consultant based
                  out of Las Vegas, Nevada.
                </p>
              </div>
            </div>
          </Card>
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
            title="Resume"
          >
            <div>
              <div className="media-container">
                <AiOutlineFilePdf
                  style={{
                    height: '100%',
                    width: '100%',
                    color: 'var(--color-red)',
                  }}
                />
              </div>
              <div>
                <p>
                  <a
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-color-orange"
                  >
                    Click Here
                  </a>{' '}
                  to open my resume in a new tab for your viewing pleasure.
                </p>
              </div>
            </div>
          </Card>
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
            title="Projects"
          >
            <div>
              <div className="media-container">
                <AiOutlineProject
                  style={{
                    height: '100%',
                    width: '100%',
                    color: 'var(--color-red)',
                  }}
                />
              </div>
              <div>
                <p>
                  <Link className="text-color-orange">Click Here</Link> to
                  browse a collection of projects that Joseph has been involved
                  in.
                </p>
              </div>
            </div>
          </Card>
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
            title="Blog"
          >
            <div>
              <div className="media-container">
                <RiArticleLine
                  style={{
                    height: '100%',
                    width: '100%',
                    color: 'var(--color-red)',
                  }}
                />
              </div>
              <div>
                <p>
                  <Link className="text-color-orange">Click Here</Link> to keep
                  up to date with what Joseph is currently working on.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

/*
 <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
          >
            <div className="media-container">
              <img src={headshot} alt="Joseph.png" className="headshot"></img>
            </div>

            <h3>About myself</h3>
            <p>I'm a big shot</p>
          </Card>
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
          >
            <div className="media-container">
              <PDFViewer pdfUrl={pdf} />
            </div>
            <h3>Resume</h3>
            <p>Download Link?</p>
          </Card>
          <Card
            backgroundColor="var(--background-primary)"
            textColor="var(--text-primary)"
          >
            <h3>About myself</h3>
            <p>I'm a big shot</p>
          </Card>
*/
