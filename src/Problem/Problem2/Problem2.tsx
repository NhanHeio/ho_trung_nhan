import {Autocomplete, Box, Grid, InputAdornment, Stack, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";

interface ICurrency {
    currency: string;
    date: string;
    price: number;
}

export const CurrencySwapForm = () => {
    const [currency, setCurrency] = useState<ICurrency[]>([]);
    const [firstCurrency, setFirstCurrency] = useState<string>("");
    const [firstAmount, setFirstAmount] = useState<string>("0");
    const [secondCurrency, setSecondCurrency] = useState<string>("");
    const [secondAmount, setSecondAmount] = useState<string>("0");
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getCurrency = async () => {
            const result = await axios('https://interview.switcheo.com/prices.json');
            setCurrency(result.data);
        }
        getCurrency();
    }, [])

    useEffect(() => {
        covertCurrency();
        setError(validateInput());
    }, [firstCurrency, firstAmount, secondCurrency, secondAmount])

    const validateInput = () => {
        let isFirstCurrencyValid = firstCurrency === "";
        let isSecondCurrencyValid = secondCurrency === "";
        let isAmountVaild = isNaN(+firstAmount)
        return isFirstCurrencyValid || isSecondCurrencyValid || isAmountVaild
    }

    const covertCurrency = () => {
        if (firstAmount || firstCurrency || secondCurrency) {
            let fistPrice = currency.filter((c) => c.currency === firstCurrency);
            let secondPrice = currency.filter((c) => c.currency === secondCurrency);
            let result = ((+firstAmount)*fistPrice[0]?.price)/secondPrice[0]?.price;
            setSecondAmount(result.toFixed(2).toString())
        }
    }

    const getCurrencyOptions = (currency: ICurrency[]): string[] => {
        let listOfCurrency = currency.map((c) => {
            return c.currency;
        })
        return [...new Set(listOfCurrency)];
    }

    return (
        <>
            <h1>Fancy Form</h1>
            <Box sx={{
                display: "flex",
                justifyContent: "space-around"
            }}>
                <Grid container spacing={2} sx={{margin: "20px", width: "400px"}}>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <Autocomplete
                                id="fist-currency"
                                disableClearable
                                value={firstCurrency}
                                onChange={(event, value) => {
                                    setFirstCurrency(value)
                                }}
                                options={getCurrencyOptions(currency)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                            <TextField
                                error={error}
                                label={error ? "Invalid Amount" : "Amount"}
                                value={firstAmount}
                                onChange={(event) => {
                                    setFirstAmount(event.target.value)
                                }}
                                InputProps={{
                                    startAdornment: (firstCurrency !== "" && (
                                        <InputAdornment position="start">
                                            <img src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${firstCurrency}.svg`}/>
                                        </InputAdornment>
                                    )),
                                }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack spacing={2}>
                            <Autocomplete
                                freeSolo
                                id="second-currency"
                                disableClearable
                                value={secondCurrency}
                                onChange={(event, value) => {
                                    setSecondCurrency(value)
                                }}
                                options={getCurrencyOptions(currency)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search input"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}
                                    />
                                )}
                            />
                            <TextField
                                label="Amount"
                                value={secondAmount}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (secondCurrency !== "" && (
                                        <InputAdornment position="start">
                                            <img src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${secondCurrency}.svg`}/>
                                        </InputAdornment>
                                    )),
                                }}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}