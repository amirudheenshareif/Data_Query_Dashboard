
# AI-Powered Data Query Dashboard

This tool is developed to empower non-technical teams by enabling them to ask complex business question in natural language.The Dashboard instantly translates these questions into data visualizations, such as charts and graphs, making data insights accessible to everyone without requiring technical expertise.


## Features

- **Natural Language Processing**: Users can query data in plain English, without technical knowledge.

- **AI-Powered Error Detection**: Integrated with Google Gemini API to detect typos and provide relevant question suggestions.
- **Instant Data Visualizations**: Generates dynamic visualizations (charts, graphs) based on user queries.
- **Real-time suggestions**: Enhances user interaction by offering possible questions as they type.


##  Key Optimizations And Enhancements

- **Keyword-Based Function Mapping:** Instead of mapping the same data to every user query, specific keywords are extracted from the query and mapped to dedicated functions. Each function retrieves specific data, ensuring that the populated charts are contextually relevant and accurate.

- **Debouncing API Calls:** Implemented debouncing to reduce the frequency of API requests, minimizing network load and enhancing application performance while providing a smoother user experience.
## Future Enhancements

- To Develop an **efficient algorithm** to identify whether the query from user has relevant data in database to ensure accurate visualization.
- To Implement **real data sources** instead of mock data to provide more accurate and meaningful insights.
- To **reduce dependency** on the Google Gemini API  for typo detection and query suggestions instead to work with some lightweight, locally hosted models.
## Tech Stack

**Frontend:** React, TailwindCSS. 

**State Management:** ContextAPI.

**Database:** IndexedDB (Dexie).

**Data Visualization:** Recharts.

## Demo

https://github.com/user-attachments/assets/def61447-31c5-4c29-855a-b848feeb3efd