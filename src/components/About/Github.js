import React from "react";
import GitHubCalendar from "react-github-calendar";

function Github() {
  return (
    <div className="text-white">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight text-center md:text-left">
        Días que <span className="text-gradient">programo</span>
      </h2>
      <div className="overflow-x-auto pb-3">
        <div className="min-w-[740px]">
          <GitHubCalendar
            username="danielisaacdev"
            blockSize={14}
            blockMargin={5}
            fontSize={14}
            color="#93ccff"
          />
        </div>
      </div>
    </div>
  );
}

export default Github;
