import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BaseLayout from "../components/BaseLayout";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

import roadtripServices from "../services/roadtripServices";

export default function RoadtripPage() {
  const [roadtrip, setRoadtrip] = useState({});
  const [editAble, setEditAble] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();

  const getRoadtripDetails = async (roadtrip_id) => {
    try {
      const roadtrip = await roadtripServices.getRoadtrip(roadtrip_id);
      setRoadtrip(roadtrip);

      if (user && user.id === roadtrip.author) {
        console.log("user is the author");
        setEditAble(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getRoadtripDetails(id);
    }
  }, [id]);

  return (
    <BaseLayout>
      <header>
        <div
          className="w-full bg-cover bg-center overflow-hidden rounded-2xl"
          style={{
            height: "32rem",
            backgroundImage:
              `url(https://source.unsplash.com/1050x980/?roadtrip&sig=${roadtrip.id}&auto=format&fit=crop&w=1050&q=80)`,
          }}
        >
          <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center px-16">
              <h1 className="text-white text-6xl font-semibold uppercase">
                {roadtrip.title}
              </h1>
              <p className="mt-2 text-gray-100 text-2xl">
                {roadtrip.sub_title}
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="px-8 mt-16 space-y-8 pb-8">
        <p className="first-line:tracking-widest first-letter:text-3xl">
          {roadtrip.description}
        </p>
        <div>
          <h3 className="text-2xl font-semibold">Waypoints</h3>
          <ul className="grid grid-cols-1 mt-4">
            {roadtrip.waypoints &&
              roadtrip.waypoints.map((waypoint) => (
                <li className="bg-white border-b-2 py-8 overflow-hidden">
                  <div className="items-center text-center">
                    <h2 className="text-2xl font-bold">{waypoint.name}</h2>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </main>
    </BaseLayout>
  );
}
