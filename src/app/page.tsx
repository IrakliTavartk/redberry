export default function Home() {
  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .hover-purple:hover {
            color: #8338EC !important;
          }
        `
      }} />
      
      {/* დავალების გვერდი - First specifications */}
      <h1
        className="absolute text-gray-800 font-semibold leading-none tracking-normal"
        style={{
          width: '373px',
          height: '41px',
          top: '140px',
          left: '118px',
          fontFamily: 'FiraGO, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 600,
          fontSize: '34px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#212529'
        }}
      >
        დავალების გვერდი
      </h1>

      {/* დეპარტამენტი თანამშრომელი პრიორიტეტი - Visual only */}
      <div
        className="absolute flex items-center justify-start border bg-white"
        style={{
          width: '688px',
          height: '44px',
          top: '233px',
          left: '120px',
          borderRadius: '10px',
          borderWidth: '1px',
          borderColor: '#DEE2E6',
          gap: '45px',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}
      >
        {/* დეპარტამენტი */}
        <div className="flex-1">
          <div className="flex items-center cursor-pointer">
            <span 
              className="hover-purple transition-colors duration-200"
              style={{
                fontFamily: 'FiraGO',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#374151'
              }}
            >დეპარტამენტი</span>
            <svg 
              className="ml-2" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              style={{ 
                color: '#8338EC',
                width: '12px',
                height: '12px'
              }}
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* თანამშრომელი */}
        <div className="flex-1">
          <div className="flex items-center cursor-pointer">
            <span 
              className="hover-purple transition-colors duration-200"
              style={{
                fontFamily: 'FiraGO',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#374151'
              }}
            >თანამშრომელი</span>
            <svg 
              className="ml-2" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              style={{ 
                color: '#8338EC',
                width: '12px',
                height: '12px'
              }}
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* პრიორიტეტი */}
        <div className="flex-1">
          <div className="flex items-center cursor-pointer">
            <span 
              className="hover-purple transition-colors duration-200"
              style={{
                fontFamily: 'FiraGO',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#374151'
              }}
            >პრიორიტეტი</span>
            <svg 
              className="ml-2" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              style={{ 
                color: '#8338EC',
                width: '12px',
                height: '12px'
              }}
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}