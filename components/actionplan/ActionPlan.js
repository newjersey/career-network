import React, { useEffect } from 'react';
// import { useUserSubcollection } from '../Firebase';
import { useAuth } from '../Auth';

function getActionPlan(user, userDocRef) {
  var actionPlan = user.userData.actionPlan;
  if (actionPlan === undefined) {
    actionPlan = {
      current: {
        goals: 0,
        activities: 0,
        applications: 0,
      },
      target: {
        goals: 5,
        activities: 6,
        applications: 2,
      },
      lastResetTime: new Date(),
    };
    userDocRef.set({ actionPlan }, { merge: true });
  }

  // TODO: Add reset logic
  const sow = startOfWeek().getTime() / 1000;
  const currentTime = new Date().getTime() / 1000;
  console.log(
    'Comparing the following two times',
    currentTime,
    sow,
    actionPlan.lastResetTime.seconds
  );
  if (actionPlan.lastResetTime.seconds < sow && sow < currentTime) {
    console.log('Resetting action plan');
    actionPlan.lastResetTime = new Date();
    actionPlan.current = {
      goals: 0,
      activities: 0,
      applications: 0,
    };
    userDocRef.set({ actionPlan }, { merge: true });
  }

  return actionPlan;
}

function startOfWeek() {
  const dt = new Date();
  var diff = dt.getDate() - dt.getDay() + (dt.getDay() === 0 ? -6 : 1);
  dt.setDate(diff);
  dt.setHours(23, 25, 0, 0);
  return dt;
}

export default function GoalTracker() {
  // const goalTracker = useUserSubcollection('goalTracker');
  const { user, userDocRef } = useAuth();

  useEffect(() => {
    const ap = getActionPlan(user, userDocRef);
    // userDocRef.set({ actionPlan }, { merge: true });

    console.log('This is a test 3');
    userDocRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          let actionPlan = doc.data().actionPlan;
          console.log('count: ', actionPlan);
          actionPlan.current.goals = actionPlan.current.goals + 1;
          //userDocRef.set({ actionPlan }, { merge: true });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });

    // const docRef = userDocRef.collection('goalTracker');
    console.log('ap: ', ap);
    // console.log('goalTracker: ', goalTracker);
  });

  return <div />;
}
