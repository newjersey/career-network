import { makeStyles } from '@material-ui/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import ScaffoldContainer from '../components/ScaffoldContainer';
import StaticList from '../components/StaticList';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
  },
}));

function Networking() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ScaffoldContainer>
        <Typography variant="h3" component="h1">Relationship-Building Resources</Typography>

        <Typography variant="body1">
          Developing new connections and deepening your existing relationships are KEY to your job search.
          </Typography>
        <Typography variant="body1">
          Not only are you more likely to find out about new opportunities, people, and companies when you broaden your network, many organizations are explicitly looking for you to bring new connections to their business needs.
          </Typography>
        <Typography variant="body1">
          Although it’s something many job seekers hate, relationship building and meeting new people are the two things you need to be spending the most time on in your job search.
          </Typography>

        <StaticList title="Relationship-Building Goals in Job Search">
          <React.Fragment>
            <strong>Relationship-Building Goals in Job Search</strong> –
            People you don’t know well. Research shows that new connections are the ones most likely to bring you new opportunities.
            </React.Fragment>
          <React.Fragment>
            <strong>Deepen your existing connections</strong> –
            Make efforts to do things for people in your existing network that bring value to them. Sharing resources, offering to connect them to someone in your network, and helping them accomplish a goal can help you build positive relationships with the people you know.
            </React.Fragment>
          <React.Fragment>
            <strong>Work on interesting projects so you have something to talk about besides looking for work! </strong> –
              Research trends in your industry or occupation, write white papers or mini reports, take on a leadership role in a volunteer organization, or start a mastermind group. Set aside time to work on things that you find interesting and that will give you something to talk about when you engage with both new acquaintances as well as people in your current network.            </React.Fragment>
        </StaticList>

        <StaticList title="Relationship Basics">
          <React.Fragment>
            <strong>Don’t move too fast! </strong> –
              One of the biggest mistakes job seekers make is trying to move too quickly in the relationship. People have to know, like and trust you before they are going to be willing to give you referrals or leads, so pay attention to growing a genuine relationship before you start asking them for leads.            </React.Fragment>
          <React.Fragment>
            <strong>Focus on what you can GIVE, not on what you can GET.</strong> –
            Look for ways to help other people, including sharing resources, information, and connections. When you meet new people, think about contributions you can make to their lives or well being. Do the same with people you already know. Not only does this improve your relationships, it also makes you feel better.
            </React.Fragment>
          <React.Fragment>
            <strong>Ask questions that convey interest in the other person.</strong> –
            When you’re job searching, you can become so focused on your job search that you are either selling yourself or only asking questions that are related to your needs. But relationships are two-way. You need to remind yourself to ask questions that convey your interest in the person you are talking to, learning about what they are doing or what’s important to them, etc. This helps you identify ways that you can help them, which creates a more positive relationship.
            </React.Fragment>
          <React.Fragment>
            <strong>Try to meet people through avenues you care about. </strong> –
              participate in meetings or groups where you can meet other people who share those interests. <a href="meetup.com">Meetup.com</a> is a great way to find other people who share your interests. Join professional groups on LinkedIn, contribute to conversations, and reach out to members in the group who seem interesting or with whom you could share a resource or idea that could help them.
            </React.Fragment>
          <React.Fragment>
            <strong>Set goals to meet new people each week. </strong> –
              Challenge yourself to meet 5 new people a week, or even 10! That’s only one or two new people a day, five days a week. Having a specific numeric goal to accomplish will make it more likely that you do it.            </React.Fragment>
          <React.Fragment>
            <strong>Set weekly goals to reach out to people who are already in your network.  </strong> –
              Try starting your day by sending an email to someone you know, thanking them for some way they have contributed to your life. Or spend an hour every Friday afternoon, sending check-in emails or making catch-up calls with people you haven’t talked to for awhile. Or spend some time writing unsolicited recommendations for people you are connected to on LinkedIn.            </React.Fragment>
          <React.Fragment>
            <strong>When you meet new people, connect with them on LinkedIn by sending a personalized invitation.<a href="https://www.linkedin.com/help/linkedin/answer/46662/personalizing-invitations-to-connect?lang=en">(here's how)</a> </strong> –
            Be sure to include something you appreciate about your interaction with them or something you have in common that you noticed on their profile.
                          </React.Fragment>
          <React.Fragment>
            <strong>Don’t just network with other unemployed people.</strong> –
            Many unemployed job seekers have a tendency to connect with other people who are also unemployed. While this can be great for support, it isn’t always good for your search. Find ways to meet and connect with people who are currently working, even if it feels uncomfortable.
             </React.Fragment>
          <React.Fragment>
            <strong>Age-diversify your network.</strong> –
            Older job seekers in particular tend to have networks that skew older. But it’s people in their 30’s and 40’s who may be in the hiring manager position. Make a specific effort to reach out to people who are younger than you as they may be in the best position to help.
             </React.Fragment>
        </StaticList>

        <StaticList title="Resources to Help" />

        <StaticList title="Webinars (from NSCN)" nesting={1}>
          <Link href="https://vimeo.com/182588364">Networking for People Who Hate Networking</Link>
          <Link href="https://vimeo.com/335218945">Why Your Networking Isn’t Working and What to Do About It</Link>
          <Link href="https://vimeo.com/257006264">Connecting Without Networking to Thrive in the Gig Economy</Link>
        </StaticList>

        <StaticList title="General Relationship/Building Resources" nesting={1}>
          <Link href="https://www.lifeoptimizer.org/2007/06/06/106-tips-to-become-a-master-connector/">106 Tips To Become a Master Connector</Link>
          <Link href="http://www.thelaunchcoach.com/libraryfiles/7_Steps_To_Networking_Your_Way_To_A-Listers_Fast.pdf">66 New Ideas for Upping Your Networking Game</Link>
          <Link href="https://www.themuse.com/advice/66-new-ideas-for-upping-your-networking-game">Networking for People Who Hate Networking</Link>
          <Link href="https://drive.google.com/file/d/0B9jWVyCVFZu6bnhrYVpra1UyazQ/view?usp=sharing">The Art of Asking Workbook</Link>
          <Link href="https://idealistcareers.org/20-ways-to-network-that-dont-feel-like-networking/">20 Ways to Network that Don’t Feel Like Networking</Link>
        </StaticList>

        <StaticList title="Documents to Help With Your Networking" nesting={1}>
          <Link href="https://www.resumeworded.com/networking-email-templates/">Sample Email Networking Templates, including follow-ups and thank yous</Link>
          <Link href="https://www.careercontessa.com/advice/back-to-basics-networking/">How to Write Every Type of Professional Networking Email</Link>
          <Link href="https://vimeo.com/286052527">Beyond the Resume: Networking Documents that Can Help You Get Your Foot in the Door (Webinar)</Link>
          <Link href="https://www.careercontessa.com/advice/personal-business-card/">Personal Business Cards and Templates</Link>
        </StaticList>

        <StaticList title="Your Networking “Pitch”" nesting={1}>
          <Link href="http://timsstrategy.com/6-easy-steps-to-a-great-elevator-pitch/">
            6 Easy Steps to a Great Elevator Pitch (with examples)
            </Link>
          <Link href="https://www.thebalancecareers.com/elevator-speech-examples-and-writing-tips-2061976">
            How to Create an Elevator Pitch with Examples
            </Link>
          <Link href="https://www.businessinsider.com/how-to-create-elevator-pitch-2017-5">
            A Simple Formula for Crafting a Networking Pitch
            </Link>
          <Link href="https://www.roberthalf.com/blog/job-market/3-elevator-speech-examples-for-the-job-hunt">
            3 Elevator Speech Examples for the Job Search
          </Link>
        </StaticList>

        <StaticList title="Connecting on LinkedIn" nesting={1}>
          <Link href="https://www.weidert.com/whole_brain_marketing_blog/best-ways-to-gain-more-connections-on-linkedin">
            9 Best Ways to Grow Your Network on LinkedIn
          </Link>
          <Link href="https://www.themuse.com/advice/want-people-to-accept-your-linkedin-requests-use-these-10-templates">
            10 Templates to Get People to Accept Your LinkedIn Connection Request
          </Link>
          <Link href="https://www.themuse.com/advice/how-to-take-your-linkedin-relationship-to-the-next-levela-coffee-date">
            How to Take Your LinkedIn Relationship to the Next Level
          </Link>
          <Link href="https://www.recruiter.com/i/the-ultimate-linkedin-guide-part-3-engaging-with-your-network/">
            How to Engage with Your LinkedIn Network
          </Link>
        </StaticList>

        <StaticList title="Connecting at Networking Events" nesting={1}>

          <Link href="https://www.thebalancecareers.com/how-to-find-networking-events-worth-going-to-4178849">How to Find Networking Events Worth Going To</Link>
          <Link href="https://www.inc.com/melanie-deziel/6-surefire-tips-for-making-the-most-of-your-next-networking-event.html">6 Ways to Prepare for a Networking Event</Link>
          <Link href="https://www.thebalancecareers.com/perfect-career-networking-conversation-starters-4584702">Perfect Networking Conversation Starters</Link>
          <Link href="https://www.themuse.com/advice/6-ways-to-successfully-make-connections-even-if-you-hate-networking-events">6 Ways to Successfully Make Connections Even if You Hate Networking Events</Link>
          <Link href="https://www.thebalancecareers.com/follow-up-letter-to-a-contact-met-at-a-networking-event-2063486">How to Follow Up After Networking Events with Examples</Link>

        </StaticList>

        <StaticList title="Informational Interviews" nesting={1}>

          <Link href="https://www.thebalancecareers.com/how-an-informational-interview-can-help-your-career-2058564">How an Informational Interview Can Boost Your Career</Link>
          <Link href="https://www.themuse.com/advice/how-to-ask-for-an-informational-interview-and-get-a-yes">How to Ask for an Informational Interview and Get a Yes</Link>
          <Link href="https://www.careercontessa.com/advice/perfect-informational-interview/">The Perfect Informational Interview Template: A 5-Step Guide</Link>
          <Link href="https://biginterview.com/blog/2011/08/informational-interview-tips.html">Informational Interview Tips for Success</Link>

        </StaticList>

        <StaticList title="Start Your Own Networking Event" nesting={1}>

          <Link href="https://biginterview.com/blog/2011/08/informational-interview-tips.html">Start a Working Out Loud Circle</Link>
          <Link href="https://www.lifehack.org/articles/featured/how-to-start-and-run-a-mastermind-group.html">Start a Mastermind Group</Link>
          <Link href="https://linkednlocal.com/become-a-host/">Start a LinkedIn Local Group</Link>
          <Link href="http://www.thegenerositynetwork.com/resources/jeffersonian-dinners/">Have a Jeffersonian Dinner (Dinner with shared purpose & conversation)</Link>
          <Link href="https://www.forbes.com/sites/alisoncoleman/2018/09/24/when-you-cant-find-the-right-networking-group-start-one-of-your-own/#7dba0377468b">When You Can’t Find the Right Networking Group, Start One Of Your Own</Link>

        </StaticList>

        <StaticList title="Getting Referrals" nesting={1}>
          <Link href="https://www.glassdoor.com/blog/how-to-ask-for-a-referral/">How to Ask for a Referral</Link>
          <Link href="https://www.thebalancecareers.com/how-to-ask-for-a-job-referral-2062989">How to Ask for Job Referral</Link>

        </StaticList>


      </ScaffoldContainer>
    </div>
  );
}

export default Networking;
