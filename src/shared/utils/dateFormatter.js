export const formatDate = (dateString, options = {month: 'short', year: 'numeric'}) => {
    if (!dateString) return null;
    try {
        return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
    } catch (e) {
        console.error("Error formatting date:", e);
        return "Invalid date";
    }
};
