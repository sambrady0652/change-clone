import React from 'react';



const Footer = () => {
  return (
    <>
        <div className="Footer" style={{position: 'relative', height: '150px', marginTop: 'auto', bottom: '0', width: '100%', backgroundColor: "#F6F4F6", borderTop: '2px solid black', padding: '10px 0'}}>
            <div className="Footer__names" style={{display: "flex", justifyContent: "space-around", padding: '20px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold'}}>
                    Stedman Houston
                    <a href="https://github.com/StedHouston">
                        <img style={{height: '43px', width: '43px'}} src="/images/GitHub-icon.png" alt=''/>
                    </a>
                    <a href="https://www.linkedin.com/in/stedman-houston-97b11213a/">
                        <img style={{height: '37px', width: '40px'}} src="/images/linkedin_image.png" alt=''/>
                    </a>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold'}}>
                    Sam Brady
                    <a href="https://github.com/sambrady0652">
                        <img style={{height: '43px', width: '43px'}} src="/images/GitHub-icon.png" alt=''/>
                    </a>
                    <a href="https://www.linkedin.com/in/sam-brady-0652/">
                        <img style={{height: '37px', width: '40px'}} src="/images/linkedin_image.png" alt=''/>
                    </a>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold'}}>
                    Ben Anderson
                    <a href="https://github.com/andersjbe">
                        <img style={{height: '43px', width: '43px'}} src="/images/GitHub-icon.png" alt=''/>
                    </a>
                    <a href="https://www.linkedin.com/in/ben-anderson-79964266/">
                        <img style={{height: '37px', width: '40px'}} src="/images/linkedin_image.png" alt=''/>
                    </a>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: 'bold'}}>
                    Zackery Haley
                    <a href="https://github.com/Zackitty">
                        <img style={{height: '43px', width: '43px'}} src="/images/GitHub-icon.png" alt=''/>
                    </a>
                    <a href="">
                        <img style={{height: '37px', width: '40px'}} src="/images/linkedin_image.png" alt=''/>
                    </a>
                </div>
            </div>

        </div>
    </>
  )
}

export default Footer;
