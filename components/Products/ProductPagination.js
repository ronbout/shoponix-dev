import { useRouter } from 'next/router';
import { Container, Pagination } from 'semantic-ui-react';

const ProductPagination = ({totalPages}) => {
    const router = useRouter();

    let term = '';
    if(router.query.term){
        term = `&&term=${router.query.term}`
    }
    // console.log(router.query)

    return (
        <>
            <Container textAlign="center">
                <Pagination 
                    defaultActivePage={1}
                    firstItem={null}
                    lastItem={null}
                    totalPages={totalPages}
                    onPageChange={(e, data) => {
                        data.activePage === 1 ? router.push('/products').then(() => window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: 'smooth'
                        })) : router.push(`/products?page=${data.activePage}${term}`).then(() => window.scrollTo({
                            top: 0,
                            left: 100,
                            behavior: 'smooth'
                        }));
                    }}
                />
            </Container>
        </>
    );
}

export default ProductPagination;
