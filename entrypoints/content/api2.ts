export const mockMarkdown = async ()=>{
    await Promise.resolve(
        setTimeout(()=>{
            console.log('Mock markdown');
        }, 2000)
    );

}