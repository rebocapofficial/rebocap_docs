import React from 'react';

export default function SteamVRSection1() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px', flexWrap: 'wrap', alignItems: 'center', margin: '15px 0', backgroundColor: '#eef', border: '2px solid blue', padding: '10px' }}>
      <div style={{ flex: '1.5 1 250px' }}>
        <h3 style={{ color: 'red' }}>IF YOU SEE THIS, THE COMPONENT IS MOUNTING!</h3>
        <strong> - 尽量使用steamvr的桌面窗口去操控rebocap软件。</strong><br />
        一些vr头显返回到内置系统后会停止/休眠steamvr的数据，<br />
        在重新返回steamvr后会出现方向错位。<br />
        ( <u>Virtual Desktop</u>不受该问题影响，但要避免quest系统休眠 )<br />
        <details className="plain-details"><summary>详情</summary>
          ·················<br />
        </details>
      </div>
    </div>
  );
}