import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticList from '../components/StaticList';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function LinkedinResources() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">LinkedIn Resources:</Typography>

        <Typography variant="body1">
          LinkedIn is one of your most powerful job search tools, allowing you to articulate your
          value to potential employers in multiple ways. Use these resources to maximize your
          profile and create a strategic plan for using LinkedIn for your job search.
        </Typography>
        <Typography variant="body1">
          Build an online profile to communicate your experience, expertise and skills.
        </Typography>
        <Typography variant="body1">
          Establish a personal brand on LinkedIn that will set you apart from other job seekers.
        </Typography>
        <Typography variant="body1">
          Identify companies on LinkedIn.
        </Typography>
        <Typography variant="body1">
          Research companies on LinkedIn.
        </Typography>
        <Typography variant="body1">
          Find connections at companies on LinkedIn.
        </Typography>
        <Typography variant="body1">
          Make new connections and build relationships on LinkedIn. Networking is a significant
          part of job search, so use LinkedIn to meet and interact with other professionals.
        </Typography>


        <StaticList title="The Basics of LinkedIn:">
          <React.Fragment>
            <strong>Set up your LinkedIn Profile</strong>
            {' '}
            –
            get started on LinkedIn to equip yourself with the tools and resources needed to
            conduct an effective job search.
            {' '}
            <a href="https://www.jobscan.co/linkedin-profile-writing-guide">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Continuously Improve Your Profile</strong>
            {' '}
            –
            know what employers look for in your profile and how to create a profile that will
            get you noticed. Set yourself apart by continuously updating your profile and engaging
            with your network. The more complete and active your LinkedIn profile is, the better
            your chances to be found and contacted by an employer.
            {' '}
            <a href="https://www.themuse.com/advice/9-surefire-ways-to-boost-your-linkedin-profile-when-you-only-have-10-minutes">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Use LinkedIn Effectively</strong>
            {' '}
            –
            make the most of this powerful platform. While individuals use LinkedIn for
            professional networking, connecting, and job searching, companies use it for
            recruiting and for sharing company information with prospective employees.
            Make sure you are using your profile effectively to help you in your job search.
            {' '}
            <a href="https://www.themuse.com/advice/the-secret-to-building-a-linkedin-profile-that-gets-results">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Make New Connections on LinkedIn</strong>
            {' '}
            –
            Research shows that new connections are the ones most likely to bring you new
            opportunities. Per the Jobvite Recruiter Nation Survey, 87 percent of recruiters
            use LinkedIn as part of their candidate search.
            {' '}
            <a href="https://www.wordstream.com/blog/ws/2016/01/18/linkedin-connection-requests">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Deepen your Existing Connections on LinkedIn</strong>
            {' '}
            –
            Make efforts to do things for people in your existing network that bring value to them.
            Sharing resources, offering to connect them to someone in your network, and helping
            them accomplish a goal can help you build positive relationships with the people you
            know. The more you interact and post as a professional, the more you’ll be noticed
            and build recognition.
            {' '}
            <a href="https://www.topresume.com/career-advice/meaningful-linkedIn-network-connections">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Build Your Brand on LinkedIn</strong>
            {' '}
            –
            In today’s working world, your professional online brand is key. The best online
            identities are real, honest, and focus on what makes you unique and what you can offer.
            {' '}
            <a href="https://university.linkedin.com/content/dam/university/global/en_US/site/pdf/TipSheet_BuildingYourBrand.pdf">(Link to resource)</a>
          </React.Fragment>
          <React.Fragment>
            <strong>Identify and Research Companies on LinkedIn</strong>
            {' '}
            –
            A major portion of your job search time should be spent on identifying and researching
            target companies and making connections to individuals within those companies. LinkedIn
            makes it easy to find and follow companies. LinkedIn is a tool that can assist with
            identifying companies you may want to work for, learning about that companies values,
            searching for open positions, and making connections to company employees.
            {' '}
            <a href="https://premium.linkedin.com/content/premium/global/en_us/index/jobsearch/resources/get-connected/how-to-build-a-list-of-target-companies">(Link to resource)</a>
          </React.Fragment>
        </StaticList>

        <StaticList title="Resources to Help: Full Listing" />

        <StaticList title="Webinars (from NSCN)" nesting={1}>
          <Link href="https://vimeo.com/210261370">Professional Branding Blueprint with Crystal Chisholm</Link>
          <Link href="https://vimeo.com/199844735">Using CARs/PARs to Sell Your Accomplishments to Employers</Link>
          <Link href="https://vimeo.com/259199992">LinkedIn Takeover</Link>
          <Link href="https://vimeo.com/181768335">Better LinkedIn Profiles</Link>
          <Link href="https://vimeo.com/177245804">Taking Charge of Your Job Search</Link>
          <Link href="https://vimeo.com/279322237">Beyond the Profile: Using Twitter and LinkedIn for Career Success</Link>

        </StaticList>

        <StaticList title="Getting Started on LinkedIn" nesting={1}>
          <Link href="https://www.jobscan.co/linkedin-profile-writing-guide">Linkedin Profile Writing Guide</Link>
          <Link href="https://www.youtube.com/watch?v=_kwqqtpprrE">How To Use LinkedIn For Beginners - 7 LinkedIn Profile Tips</Link>
          <Link href="https://www.youtube.com/watch?v=l380M3dZ4BQ">How to create a KILLER Linkedin Profile - 10 Simple Steps</Link>
          <Link href="https://www.youtube.com/watch?v=XmDaiybXhJw">LinkedIn 101 - Getting Started</Link>
          <Link href="https://www.workitdaily.com/getting-started-on-linkedin-quick-guide">5-Step Quick Guide For Getting Started On LinkedIn</Link>
          <Link href="https://thinkbespoke.com.au/2018/06/5-key-steps-to-help-you-get-started-with-linkedin.html">5 Key Steps to Help You Get Started with LinkedIn</Link>
          <Link href="https://www.usatoday.com/story/money/personalfinance/2016/01/16/how-get-started-linkedin-do-not/77514202/">How to get started on LinkedIn: Do this, not that</Link>
        </StaticList>

        <StaticList title="Improving Your LinkedIn Profile" nesting={1}>
          <Link href="https://www.youtube.com/watch?v=067JFQcSvqs">15 Easy LinkedIn Profile Tips You Can Do Today</Link>
          <Link href="https://www.themuse.com/advice/10-ways-to-improve-your-linkedin-profile-in-under-5-minutes">10 Ways to Improve Your LinkedIn Profile in Under 5 Minutes</Link>
          <Link href="https://www.themuse.com/advice/9-surefire-ways-to-boost-your-linkedin-profile-when-you-only-have-10-minutes">9 Surefire Ways to Boost Your LinkedIn Profile When You Only Have 10 Minutes</Link>
          <Link href="https://www.forbes.com/sites/forbescoachescouncil/2018/10/12/15-ways-to-boost-your-linkedin-profile/#64465fc93137">15 Ways To Boost Your LinkedIn Profile</Link>
          <Link href="https://www.forbes.com/sites/jillgriffin/2018/09/14/9-easy-ways-to-enhance-your-linkedin-profile-today/#36a6d32c7bd5">9 Easy Ways To Enhance Your LinkedIn Profile Today</Link>
        </StaticList>

        <StaticList title="Using LinkedIn Effectively" nesting={1}>
          <Link href="https://www.thebalancecareers.com/how-to-use-linkedin-2062597">How to Use LinkedIn Effectively</Link>
          <Link href="https://www.linkedin.com/pulse/how-create-killer-linkedin-profile-get-you-noticed-bernard-marr/">How To Create A Killer LinkedIn Profile That Will Get You Noticed</Link>
          <Link href="https://www.mindtools.com/pages/article/linkedin.htm">How to Use LinkedIn Effectively</Link>
          <Link href="https://www.themuse.com/advice/the-31-best-linkedin-profile-tips-for-job-seekers">The 31 Best LinkedIn Profile Tips for Job Seekers</Link>
          <Link href="https://www.youtube.com/watch?v=YFkqp9W1xTc">How to Use LinkedIn and Make Your LinkedIn Profile Stand Out - 7 BEST LinkedIn Tips</Link>
          <Link href="https://www.topresume.com/career-advice/14-ways-to-leverage-your-linkedin-profile-during-your-job-search">How to Use LinkedIn to Get a Job</Link>
          <Link href="https://www.forbes.com/sites/dailymuse/2018/01/22/7-expert-linkedin-tips-a-lot-of-people-dont-really-know-about/#77fb7e172f2a">7 Expert LinkedIn Tips A Lot Of People Don’t Really Know About</Link>
        </StaticList>

        <StaticList title="Personal Branding on LinkedIn" nesting={1}>
          <Link href="https://university.linkedin.com/content/dam/university/global/en_US/site/pdf/TipSheet_BuildingYourBrand.pdf">Build Your Personal Brand on LinkedIn</Link>
          <Link href="https://business.linkedin.com/en-uk/marketing-solutions/blog/posts/sales-solutions/2019/14-tips-to-get-your-LinkedIn-profile-selling-harder-for-you-this-year">14 tips to get your LinkedIn profile selling harder for you this year</Link>
          <Link href="https://www.job-hunt.org/personal-branding/linkedin-personal-branding.shtml">Guide to Personal Branding with LinkedIn</Link>
          <Link href="https://business.linkedin.com/marketing-solutions/blog/best-practices--thought-leadership/2016/5-free-ways-to-build-your-personal-brand-on-linkedin">5 Free Ways to Build Your Personal Brand on LinkedIn</Link>
          <Link href="https://business.linkedin.com/talent-solutions/blog/recruiting-tips/2019/how-to-build-a-personal-brand-that-will-impress-even-oprah">How to Build a Personal Brand That Will Impress Even Oprah</Link>
          <Link href="https://www.topresume.com/career-advice/14-ways-to-leverage-your-linkedin-profile-during-your-job-search">Here Are The Tips For Using LinkedIn For Personal Branding</Link>
          <Link href="https://www.entrepreneur.com/article/315272">7 Expert LinkedIn Tips A Lot Of People Don’t Really Know About</Link>
        </StaticList>

        <StaticList title="Making Connections on LinkedIn" nesting={1}>
          <Link href="https://www.linkedin.com/help/linkedin/answer/118/inviting-or-connecting-with-people-on-linkedin?lang=en">Inviting or Connecting with People on LinkedIn</Link>
          <Link href="https://www.wordstream.com/blog/ws/2016/01/18/linkedin-connection-requests">How to Write the Perfect LinkedIn Connection Request</Link>
          <Link href="https://www.wordtracker.com/academy/social/linkedin/linkedin-connections">How to find connections and get recommendations on LinkedIn</Link>
          <Link href="https://business.linkedin.com/marketing-solutions/blog/best-practices--thought-leadership/2016/5-free-ways-to-build-your-personal-brand-on-linkedin">5 Free Ways to Build Your Personal Brand on LinkedIn</Link>
          <Link href="https://www.socialmediaexaminer.com/powerful-network-linkedin/">How to Build a Powerful Network Using LinkedIn</Link>
          <Link href="https://www.forbes.com/sites/forbesagencycouncil/2018/08/29/five-ways-to-engage-new-linkedin-connections/#33e2cd6229bf">Five Ways To Engage New LinkedIn Connections</Link>
          <Link href="https://www.themuse.com/advice/having-500-linkedin-contacts-means-nothing-unless">Having 500+ LinkedIn Contacts Means Nothing, Unless...</Link>
        </StaticList>

        <StaticList title="The Strength of your LinkedIn Profile and Network" nesting={1}>
          <Link href="https://www.linkedin.com/pulse/12-steps-reach-all-star-linkedin-profile-status-claire-greenhow/">12 Steps to Reach All-Star Linkedin Profile Status</Link>
          <Link href="https://www.forbes.com/sites/williamarruda/2017/02/05/linkedin-201-how-to-cultivate-a-powerful-network/#33a38e735422">LinkedIn 201: How To Cultivate A Powerful Network</Link>
          <Link href="https://www.topresume.com/career-advice/meaningful-linkedIn-network-connections">LinkedIn Networking: How to Cultivate Meaningful Connections Online</Link>
          <Link href="https://www.themuse.com/advice/how-to-be-a-valuable-linkedin-connection-to-people-you-havent-met-in-real-life">How to Be a Valuable LinkedIn Connection to People You Haven’t Met in Real Life</Link>
          <Link href="https://www.fastcompany.com/90265127/how-to-build-and-maintain-an-effective-linkedin-network">How to build (and maintain) an effective LinkedIn network</Link>
          <Link href="https://www.themuse.com/advice/simple-ways-to-keep-your-network-from-growing-cold">Simple Ways to Keep Your Network from Growing Cold</Link>
          <Link href="https://www.searchenginejournal.com/how-to-create-high-engagement-linkedin-posts/271719/">Top 4 Tips for Creating High Engagement LinkedIn Posts</Link>
          <Link href="https://business.linkedin.com/marketing-solutions/blog/best-practices--social-media-marketing0/2018/the-secret-to-better-engagement-on-linkedin--according-to-hootsu">The Secret to Better Engagement on LinkedIn, According to Hootsuite</Link>
          <Link href="https://www.quicksprout.com/linkedin-engagement/">How to Increase Your LinkedIn Engagement by 386%</Link>
          <Link href="https://www.dreamgrow.com/linkedin-engagement/">LinkedIn Engagement: How to Engage Your Professional Audience</Link>
          <Link href="https://www.socialmediatoday.com/news/20-linkedin-tips-to-help-boost-engagement/545369/">20 LinkedIn Tips to Help Boost Engagement</Link>
        </StaticList>

        <StaticList title="Researching Companies on LinkedIn" nesting={1}>
          <Link href="https://premium.linkedin.com/content/premium/global/en_us/index/jobsearch/resources/get-connected/how-to-build-a-list-of-target-companies">How to Build a List of Target Companies</Link>
          <Link href="https://www.questionpro.com/blog/how-to-use-linkedin-for-research/">How To Use Linkedin As A Research Engine</Link>
          <Link href="https://www.cio.com/article/2387201/careers-staffing-top-8-sites-for-researching-your-next-employer.html">8 essential resources for researching your next employer</Link>
          <Link href="https://www.thebalancecareers.com/tips-for-researching-companies-before-job-interviews-2061319">How to Research a Company for a Job Interview</Link>
        </StaticList>
      </ScaffoldContainer>
    </div>
  );
}

export default LinkedinResources;
